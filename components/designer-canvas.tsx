"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useDroppable } from "@dnd-kit/core"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import {
  Router,
  SwitchCameraIcon as Switch,
  Server,
  Laptop,
  Smartphone,
  NetworkIcon as Firewall,
  Wifi,
  ShieldAlert,
} from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you have a cn utility

const componentIcons = {
  Router: <Router className="h-6 w-6" />,
  Switch: <Switch className="h-6 w-6" />,
  Firewall: <Firewall className="h-6 w-6" />,
  Server: <Server className="h-6 w-6" />,
  Endpoint: <Laptop className="h-6 w-6" />,
  Mobile: <Smartphone className="h-6 w-6" />,
  WirelessAP: <Wifi className="h-6 w-6" />,
}

// Define types from use-architecture-designer hook if not already globally available
type ComponentType = "Router" | "Switch" | "Firewall" | "Server" | "Endpoint" | "Mobile" | "WirelessAP"
interface Component {
  id: string
  type: ComponentType
  position: { x: number; y: number }
  name?: string
  tags?: string[]
}

interface DraggableComponentProps {
  id: string
  component: Component
  onConnectStart: (id: string, event: React.MouseEvent) => void
  onConnectEnd: (id: string) => void
  isHighlighted?: boolean
}

function DraggableComponent({ id, component, onConnectStart, onConnectEnd, isHighlighted }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { current: { isPaletteItem: false, componentData: component } },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    left: component.position.x,
    top: component.position.y,
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="absolute cursor-grab">
      <div
        className={cn(
          "relative p-3 bg-card border rounded-lg shadow-sm flex flex-col items-center w-28 transition-all duration-150 ease-in-out",
          isHighlighted
            ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg scale-105"
            : "border-border",
        )}
      >
        <div className={cn("text-foreground", isHighlighted && "text-primary")}>
          {componentIcons[component.type] || <ShieldAlert className="h-6 w-6" />}
        </div>
        <p className="text-xs mt-1 text-center truncate w-full" title={component.name || component.type}>
          {component.name || component.type}
        </p>
        <button
          onMouseDown={(e) => {
            e.stopPropagation() // Prevent drag from starting
            onConnectStart(id, e)
          }}
          className="absolute -right-1.5 -bottom-1.5 h-4 w-4 bg-primary rounded-full border-2 border-background cursor-crosshair hover:bg-primary/80"
          title="Drag to connect"
        />
      </div>
    </div>
  )
}

interface DesignerCanvasProps {
  components: Record<string, Component>
  connections: Array<{ from: string; to: string }>
  addConnection: (from: string, to: string) => void
  highlightedComponentIds?: string[]
}

export function DesignerCanvas({
  components,
  connections,
  addConnection,
  highlightedComponentIds = [],
}: DesignerCanvasProps) {
  const { setNodeRef: setDroppableNodeRef } = useDroppable({ id: "canvas" })
  const [connecting, setConnecting] = useState<{ startId: string; startPos: { x: number; y: number } } | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleConnectStart = (startId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!components[startId]) return
    // Adjust startPos to be center of the component for better line drawing
    const startComponentRect = (
      event.currentTarget.closest("[data-dndkit-draggable-id]") as HTMLElement
    )?.getBoundingClientRect()
    const canvasRect = canvasRef.current?.getBoundingClientRect()

    if (startComponentRect && canvasRect) {
      const componentCenterX = components[startId].position.x + startComponentRect.width / 2
      const componentCenterY = components[startId].position.y + startComponentRect.height / 2
      setConnecting({ startId, startPos: { x: componentCenterX, y: componentCenterY } })
    } else {
      setConnecting({
        startId,
        startPos: { x: components[startId].position.x + 56, y: components[startId].position.y + 30 },
      }) // Fallback
    }
  }

  const handleConnectEnd = (endId: string) => {
    if (connecting && connecting.startId !== endId && components[endId]) {
      addConnection(connecting.startId, endId)
    }
    setConnecting(null)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (connecting && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  const handleMouseUpGlobal = () => {
    // if connecting and mouse is not over a component, cancel connection
    if (connecting) {
      setConnecting(null)
    }
  }

  // Attach global mouse up listener to cancel connection if mouse is released outside a component
  // This is a simplified approach. For more robust handling, you might need to check if the mouse is over a valid drop target.
  useState(() => {
    document.addEventListener("mouseup", handleMouseUpGlobal)
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal)
    }
  }, [connecting])

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative overflow-hidden bg-background"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div ref={setDroppableNodeRef} className="w-full h-full">
        {Object.entries(components).map(([id, component]) => (
          <div
            key={id}
            onMouseUpCapture={(e) => {
              // Use onMouseUpCapture to ensure it fires
              e.stopPropagation()
              handleConnectEnd(id)
            }}
          >
            <DraggableComponent
              id={id}
              component={component}
              onConnectStart={handleConnectStart}
              onConnectEnd={handleConnectEnd} // This prop might not be strictly needed on DraggableComponent itself if handled by parent div
              isHighlighted={highlightedComponentIds.includes(id)}
            />
          </div>
        ))}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {connections.map((conn, index) => {
            const start = components[conn.from]
            const end = components[conn.to]
            if (!start || !end) return null
            // Adjust to draw lines from center of components
            const startX = start.position.x + 56 / 2 + 28 // Approx center of a 112px wide (w-28) component
            const startY = start.position.y + 60 / 2 // Approx center of a 60px tall component
            const endX = end.position.x + 56 / 2 + 28
            const endY = end.position.y + 60 / 2

            return (
              <line
                key={index}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            )
          })}
          {connecting && (
            <line
              x1={connecting.startPos.x}
              y1={connecting.startPos.y}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--foreground))" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  )
}
