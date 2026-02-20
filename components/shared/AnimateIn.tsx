"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const maskReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

interface AnimateInProps {
  children: ReactNode;
  variant?: "revealUp" | "maskReveal";
  className?: string;
  delay?: number;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
}

export function AnimateIn({
  children,
  variant = "revealUp",
  className = "",
  delay = 0,
  as = "div",
}: AnimateInProps) {
  const variants = variant === "maskReveal" ? maskReveal : revealUp;
  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className = "" }: StaggerGroupProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimateInChild({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={revealUp} className={className}>
      {children}
    </motion.div>
  );
}
