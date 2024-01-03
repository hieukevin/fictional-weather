"use client";
import React, { useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { places } from "@/app/components/sidebar/places";

const fadeInVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.3 } },
};
const opencloseVariant: Variants = {
  open: { alignSelf: "flex-start" },
  closed: { alignSelf: "center" },
};
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <motion.div
      className={`box h-full flex flex-col w-full hover:cursor-pointer p-2 md:p-4 md:justify-between`}
      animate={{
        width: open ? "100%" : "50%",
      }}
      onHoverStart={toggle}
      onHoverEnd={toggle}
    >
      {places.map((place) => (
        <motion.div
          key={place.id}
          className={`flex flex-row items-center`}
          whileHover={{ scale: 1.1 }}
        >
          <motion.img
            src={`icons/${place.icon}`}
            alt={place.name}
            className={`w-12 md:w-16`}
          />
          {open && (
            <motion.h2
              initial="initial"
              animate="animate"
              variants={fadeInVariant}
              className={`md:ml-4 ${open ? "visible" : "hidden"}`}
            >
              {place.name}
            </motion.h2>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Sidebar;
