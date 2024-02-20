import React from "react";
import { places } from "@/app/places";
import DashboardPlace from "@/components/placeStrip";

export default function Home() {
  return (
    <main className={`md:flex h-screen grid`}>
      {places.map((place, key) => (
          <DashboardPlace name={place.name} background={place.background} routename={place.routename} key={key} />
      ))}
    </main>
  );
}
