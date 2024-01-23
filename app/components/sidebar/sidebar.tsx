"use client";
import React, { useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { places } from "@/app/places";
import Image from 'next/image'


const fadeInVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.3 } },
};
const opencloseVariant: Variants = {
  open: { width: "200%", transition: { duration: 0.5 } },
  closed: { width: "100%", transition: { duration: 0.5 } },
};

const iconVariant: Variants = { 
  open: { justifyContent: "none", transition: { duration: 0.5 } },
  closed: { justifyContent: "none", transition: { duration: 0.5 }}
}

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <motion.div
      className={`box h-full flex flex-col w-full hover:cursor-pointer p-2 md:p-4 md:justify-between`}
      animate={open ? "open" : "closed"}
      variants={opencloseVariant}
      onHoverStart={toggle}
      onHoverEnd={toggle}
    >
      {places.map((place) => (
        <motion.div
          key={place.id}
          className={`flex flex-row items-center`}
          animate={open ? "open" : "closed"}
          variants={iconVariant}
          whileHover={{ scale: 1.1 }}
        >
          <motion.img
            src={`icons/${place.icon}`}
            alt={place.name}
            className={`h-10 w-10 md:h-20 md:w-20`}
          />
          {open && (
            <motion.h2
              initial="initial"
              animate="animate"
              variants={fadeInVariant}
              className={`md:ml-4`}
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
