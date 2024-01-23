import React from "react";
import { places } from "@/app/places";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`flex h-screen `}>
      {places.map((place) => (
        // <div className={`h-full p-4 mb-4 `} key={place.id}>
        <Link
          href={place.routename}
          key={place.routename}
          className={`flex-1 relative hover:flex-[3] hover:bg-opacity-50`}
          style={{
            backgroundImage: `url('/backgrounds/${place.background}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "flex .4s",
          }}
        >
          <div
            className={`flex items-center justify-center  px-0 py-[10px] inset-0`}
            style={{ transition: "background-color .4s" }}
          >
            {/*<div*/}
            {/*  style={{*/}
            {/*    visibility: "hidden",*/}
            {/*    opacity: "0",*/}
            {/*    transformStyle: "preserve-3d",*/}
            {/*  }}*/}
            {/*>*/}
            {place.name}
            {/*</div>*/}
          </div>
        </Link>
        // </div>
      ))}
    </main>
  );
}
