"use client"

import { useDraggable } from "@dnd-kit/core"
import {
  Router,
  SwitchCameraIcon as Switch,
  Server,
  Laptop,
  Smartphone,
  NetworkIcon as Firewall,
  Wifi,
} from "lucide-react"

const paletteItems = [
  { type: "Router", icon: <Router /> },
  { type: "Switch", icon: <Switch /> },
  { type: "Firewall", icon: <Firewall /> },
  { type: "Server", icon: <Server /> },
  { type: "Endpoint", icon: <Laptop /> },
  { type: "Mobile", icon: <Smartphone /> },
  { type: "WirelessAP", icon: <Wifi /> },
]

function PaletteItem({ type, icon }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${type}`,
    data: {
      type: type,
      isPaletteItem: true,
      initialPosition: { x: 100, y: 100 }, // Placeholder, will be updated on drag start
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="p-3 border rounded-lg bg-background shadow-sm flex flex-col items-center cursor-grab w-24">
        <div className="text-primary">{icon}</div>
        <p className="text-xs mt-1">{type}</p>
      </div>
    </div>
  )
}

export function DesignerPalette() {
  return (
    <aside className="w-48 p-4 border-r bg-background overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-3">
        {paletteItems.map((item) => (
          <PaletteItem key={item.type} type={item.type} icon={item.icon} />
        ))}
      </div>
    </aside>
  )
}
