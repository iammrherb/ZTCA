"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const AnimatedLogo = () => {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative flex items-center justify-center">
      <motion.div initial="hidden" animate="visible" variants={logoVariants} className="relative z-10">
        <motion.div animate="pulse" variants={pulseVariants}>
          <Image
            src="/images/portnox-logo.png"
            alt="Portnox Logo"
            width={300}
            height={100}
            className="h-20 w-auto"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Animated background circles */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/10"
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default AnimatedLogo
