"use client"

import type React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Lock, Laptop, Server, Smartphone, Wifi } from "lucide-react"

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-[400px] overflow-hidden">
      {/* Central shield */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="bg-primary/10 p-8 rounded-full">
          <ShieldCheck className="w-20 h-20 text-primary" />
        </div>
      </motion.div>

      {/* Orbiting devices */}
      <DeviceOrbit
        containerRef={containerRef}
        items={[
          { icon: Laptop, delay: 0, offsetRadius: 120, angleOffset: 0 },
          { icon: Smartphone, delay: 0.2, offsetRadius: 120, angleOffset: 72 },
          { icon: Server, delay: 0.4, offsetRadius: 120, angleOffset: 144 },
          { icon: Wifi, delay: 0.6, offsetRadius: 120, angleOffset: 216 },
          { icon: Lock, delay: 0.8, offsetRadius: 120, angleOffset: 288 },
        ]}
      />

      {/* Pulse effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/30"
        initial={{ width: 100, height: 100, opacity: 0.8 }}
        animate={{
          width: 300,
          height: 300,
          opacity: 0,
          borderWidth: 1,
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/20"
        initial={{ width: 100, height: 100, opacity: 0.8 }}
        animate={{
          width: 300,
          height: 300,
          opacity: 0,
          borderWidth: 1,
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          delay: 1,
          ease: "easeOut",
        }}
      />
    </div>
  )
}

function DeviceOrbit({
  containerRef,
  items,
}: {
  containerRef: React.RefObject<HTMLDivElement>
  items: Array<{
    icon: React.ElementType
    delay: number
    offsetRadius: number
    angleOffset: number
  }>
}) {
  return (
    <>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: item.delay }}
        >
          <motion.div
            className="absolute"
            style={{
              width: item.offsetRadius * 2,
              height: item.offsetRadius * 2,
              borderRadius: "50%",
              x: -item.offsetRadius,
              y: -item.offsetRadius,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                width: 50,
                height: 50,
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                marginLeft: -25,
                marginTop: -25,
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transform: `rotate(${item.angleOffset}deg) translate(${item.offsetRadius}px) rotate(-${item.angleOffset}deg)`,
              }}
            >
              <item.icon className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}
