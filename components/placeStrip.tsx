'use client'
import React from 'react'
import Image from 'next/image'
import {  motion } from 'framer-motion'
import Link from 'next/link'

function DashboardPlace({name, background, routename, key} : {name: string, background: string, routename: string, key: number}) {

  return (
      <Link
          href={routename}
          key={key}
          rel='preload'
          className={`flex-1 relative hover:flex-[3] hover:bg-opacity-50`}
          style={{
            transition: "flex .4s",
          }}
        >
          
          <div
            className={`flex justify-center px-0 py-[10px] inset-0`}
          >
            {name}
          </div>
          
        <Image
          src={`/backgrounds/${background}`}
          className="relative h-full w-full overflow-hidden -z-10"
          alt="image"
          fill
          // placeholder='blur'
          // blurDataURL={`/backgrounds/${background}`}
          style={{ transition: "transform .4s", objectFit: "cover"
        }}
        />
        </Link>
  )
}

export default DashboardPlace