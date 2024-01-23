import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import {
	json,
	type MetaFunction,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import { useState } from 'react'
import { AuthenticityTokenInput } from 'remix-utils/csrf/react'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { z } from 'zod'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { ErrorList, Field } from '#app/components/forms.tsx'
import { IzzyLogo } from '#app/components/icons/izzy-logo'
import LoginWrapper from '#app/components/login-wrapper'
import { Button } from '#app/components/ui/button'
import { Input } from '#app/components/ui/input'
import { Label } from '#app/components/ui/label'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { signup } from '#app/utils/auth.server'
import {
	ProviderConnectionForm,
	providerNames,
} from '#app/utils/connections.tsx'
import { validateCSRF } from '#app/utils/csrf.server.ts'
import { checkHoneypot } from '#app/utils/honeypot.server.ts'
import { useIsPending } from '#app/utils/misc.tsx'
import { authSessionStorage } from '#app/utils/session.server'
import { redirectWithToast } from '#app/utils/toast.server'
import {
	EmailSchema,
	NameSchema,
	PasswordSchema,
	PhoneSchema,
	SurnameSchema,
} from '#app/utils/user-validation.ts'

const SignupSchema = z
	.object({
		email: EmailSchema,
		name: NameSchema,
		surname: SurnameSchema,
		phoneNumber: PhoneSchema,
		newsletter: z.boolean().optional(),
		password: PasswordSchema,
		confirmPassword: PasswordSchema,
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				path: ['confirmPassword'],
				code: 'custom',
				message: 'Hesla se musí shodovat',
			})
		}
	})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	await validateCSRF(formData, request.headers)
	checkHoneypot(formData)

	const submission = await parse(formData, {
		schema: intent =>
			SignupSchema.transform(async (data, ctx) => {
				if (intent !== 'submit') return { ...data, session: null }

				if (!data.newsletter) {
					ctx.addIssue({
						path: ['newsletter'],
						code: 'custom',
						message: 'Musíte souhlasit s odběrem novinek',
					})
					return
				}

				const signupResult = await signup({
					email: data.email,
					password: data.password,
					name: data.name,
					phoneNumber: data.phoneNumber,
					surname: data.surname,
				})
				// TODO: handle error

				const errors = [
					...('errors' in signupResult!.signupResult
						? signupResult?.signupResult.errors
						: []),
				]

				if (errors.length) {
					errors.forEach(error => {
						ctx.addIssue({
							path: [error.path],
							code: z.ZodIssueCode.custom,
							message: error.message,
						})
					})
					return
				}

				return {
					session: signupResult?.session,
					apiHeaders: signupResult?.apiHeaders,
					...data,
				}
			}),
		async: true,
	})
	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}
	if (!submission.value?.session) {
		return json({ status: 'error', submission } as const, { status: 400 })
	}

	const { session, apiHeaders } = submission.value

	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	authSession.set('accessToken', session.accessToken)
	const headers = new Headers()
	headers.append(
		'set-cookie',
		await authSessionStorage.commitSession(authSession, {
			expires: session.expirationDate,
		}),
	)

	const apiSetCookie = apiHeaders?.get('set-cookie')

	if (apiSetCookie) headers.append('set-cookie', apiSetCookie)

	return redirectWithToast(
		safeRedirect('/'),
		{ title: 'Registrace proběhla úspěšně', description: 'Vítejte v Izzy!' },
		{ headers },
	)
}

export const meta: MetaFunction = () => {
	return [{ title: 'IZZY | Registrace' }]
}

export default function SignupRoute() {
	const actionData = useActionData<typeof action>()
	const isPending = useIsPending()
	const [searchParams] = useSearchParams()
	const redirectTo = searchParams.get('redirectTo')

	const [form, fields] = useForm({
		id: 'signup-form',
		constraint: getFieldsetConstraint(SignupSchema),
		lastSubmission: actionData?.submission,
		onValidate({ formData }) {
			const result = parse(formData, { schema: SignupSchema })
			return result
		},
		defaultValue: {},
	})

	const [isNaturalPerson, setIsNaturalPerson] = useState(true)
	const handleNaturalPersonClick = () => {
		setIsNaturalPerson(true)
	}

	const handleJuridicalPersonClick = () => {
		setIsNaturalPerson(false)
	}

	return (
		<LoginWrapper>
			<div className="grid place-items-center p-3">
				<div className="min-w-[320px] pt-6">
					<Link to="/" prefetch="intent">
						<IzzyLogo className="max-lg:hidden" />
					</Link>
					<h1 className="mb-8 mt-12 text-2xl font-bold leading-8 text-headings">
						Registrace
					</h1>
					<div className="flex items-start gap-[32px] pb-[16px]">
						<Button
							className={
								isNaturalPerson
									? ' bg-izzy-light-blue text-primary hover:border hover:bg-white hover:text-[#75809B]'
									: 'border bg-white text-[#75809B] hover:bg-izzy-light-blue hover:text-primary'
							}
							onClick={handleNaturalPersonClick}
						>
							Fyzická osoba
						</Button>

						<Button
							className={
								!isNaturalPerson
									? ' bg-izzy-light-blue text-primary hover:border hover:bg-white hover:text-[#75809B]'
									: 'border bg-white text-[#75809B] hover:bg-izzy-light-blue hover:text-primary'
							}
							onClick={handleJuridicalPersonClick}
						>
							Právnická osoba
						</Button>
					</div>
					<Form method="POST" {...form.props}>
						<AuthenticityTokenInput />
						<HoneypotInputs />
						<input
							type="hidden"
							name="isNaturalPerson"
							value={String(isNaturalPerson)}
						/>
						{isNaturalPerson && (
							<div className="grid grid-cols-2 gap-4">
								<Field
									labelProps={{ children: 'Jméno' }}
									inputProps={{
										...conform.input(fields.name),
										autoComplete: 'name',
									}}
									errors={fields.name.errors}
								/>

								<Field
									labelProps={{ children: 'Příjmení' }}
									inputProps={{
										...conform.input(fields.surname),
										autoComplete: 'surname',
									}}
									errors={fields.surname.errors}
								/>
							</div>
						)}
						{!isNaturalPerson && (
							<>
								<Field
									labelProps={{
										children: 'Jméno firmy',
									}}
									inputProps={{
										...conform.input(fields.email),
										autoFocus: true,
										autoComplete: 'email',
									}}
									errors={fields.email.errors}
								/>

								<Field
									labelProps={{ children: 'Adresa' }}
									inputProps={{
										...conform.input(fields.phoneNumber),
										autoComplete: 'phone',
									}}
									errors={fields.phoneNumber.errors}
								/>

								<div className="grid grid-cols-2 gap-4">
									<Field
										labelProps={{ children: 'IČO' }}
										inputProps={{
											...conform.input(fields.name),
											autoComplete: 'name',
										}}
										errors={fields.name.errors}
									/>

									<Field
										labelProps={{ children: 'DIČ' }}
										inputProps={{
											...conform.input(fields.surname),
											autoComplete: 'surname',
										}}
										errors={fields.surname.errors}
									/>
								</div>
							</>
						)}

						<Field
							labelProps={{
								htmlFor: fields.email.id,
								children: 'E-mail',
							}}
							inputProps={{
								...conform.input(fields.email),
								autoFocus: true,
								autoComplete: 'email',
							}}
							errors={fields.email.errors}
						/>

						<Field
							labelProps={{ children: 'Telefonní číslo' }}
							inputProps={{
								...conform.input(fields.phoneNumber),
								autoComplete: 'phone',
							}}
							errors={fields.phoneNumber.errors}
						/>

						<Field
							labelProps={{ children: 'Heslo' }}
							inputProps={{
								...conform.input(fields.password, {
									type: 'password',
								}),
								autoComplete: 'current-password',
							}}
							errors={fields.password.errors}
						/>

						<Field
							labelProps={{ children: 'Potvrďte heslo' }}
							inputProps={{
								...conform.input(fields.confirmPassword, {
									type: 'password',
								}),
								autoComplete: 'current-password',
							}}
							errors={fields.confirmPassword.errors}
						/>

						<div className="mb-4 mt-4 flex flex-row-reverse items-center gap-4">
							<Label htmlFor="newsletter">
								Chci dostávat informace o slevách, akčních nabídkách a
								obchodních sděleních
							</Label>
							<Input
								id="newsletter"
								className="h-auto w-auto"
								{...conform.input(fields.newsletter, {
									type: 'checkbox',
								})}
							/>
						</div>
						<div className="min-h-[32px] px-4 pb-3 pt-1">
							{fields.newsletter.errors?.length ? (
								<ErrorList
									id={fields.newsletter.errorId}
									errors={fields.newsletter.errors}
								/>
							) : null}
						</div>

						<ErrorList errors={form.errors} id={form.errorId} />
						<StatusButton
							className="w-full"
							status={isPending ? 'pending' : actionData?.status ?? 'idle'}
							type="submit"
							disabled={isPending}
							size="wide"
						>
							Registrovat se
						</StatusButton>
					</Form>
					<ul className="mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3">
						{providerNames.map(providerName => (
							<li key={providerName}>
								<ProviderConnectionForm
									type="Signup"
									providerName={providerName}
									redirectTo={redirectTo}
								/>
							</li>
						))}
					</ul>
					<div className="flex items-center gap-2 pt-3">
						<span className="text-[#BABBC1]">Již máte účet?</span>
						<Link
							prefetch="intent"
							to={
								redirectTo
									? `/login?${encodeURIComponent(redirectTo)}`
									: '/login'
							}
							className="font-semibold text-primary"
						>
							Přihlásit se
						</Link>
					</div>
				</div>
			</div>
		</LoginWrapper>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
