"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { LayoutGrid, Network, ShieldCheck, Trash2, Play, Settings2, Eye, EyeOff } from "lucide-react"
import { Laptop, Smartphone, Wifi } from "lucide-react"
import { DesignerCanvas } from "@/components/designer-canvas"
import { DesignerPalette, type PaletteItemProps } from "@/components/designer-palette"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useArchitectureDesigner } from "@/hooks/use-architecture-designer"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define types from use-architecture-designer hook if not already globally available
type ComponentType = "Router" | "Switch" | "Firewall" | "Server" | "Endpoint" | "Mobile" | "WirelessAP"
interface Component {
  id: string
  type: ComponentType
  position: { x: number; y: number }
  name?: string
  tags?: string[]
}
interface Recommendation {
  id: string
  title: string
  description: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Informational"
  category: "Visibility" | "Control" | "Segmentation" | "Compliance" | "Threat Prevention" | "Resilience"
  relatedComponents?: string[]
  remediation?: string
}
interface AnalysisResult {
  summary: string
  score: number // 0-100
  recommendations: Recommendation[]
}

const paletteItems: PaletteItemProps[] = [
  { id: "Router", name: "Router", type: "Router", icon: <Network className="h-5 w-5" /> },
  { id: "Switch", name: "Switch", type: "Switch", icon: <LayoutGrid className="h-5 w-5" /> },
  { id: "Firewall", name: "Firewall", type: "Firewall", icon: <ShieldCheck className="h-5 w-5" /> },
  { id: "Server", name: "Server", type: "Server", icon: <Laptop className="h-5 w-5" /> },
  { id: "Endpoint", name: "Endpoint (PC)", type: "Endpoint", icon: <Smartphone className="h-5 w-5" /> },
  { id: "Mobile", name: "Mobile Device", type: "Mobile", icon: <Smartphone className="h-5 w-5" /> },
  { id: "WirelessAP", name: "Wireless AP", type: "WirelessAP", icon: <Wifi className="h-5 w-5" /> },
]

export default function DesignerPage() {
  const {
    components,
    connections,
    addComponent,
    moveComponent,
    updateComponentData,
    addConnection,
    clearArchitecture,
    analyzeArchitecture,
  } = useArchitectureDesigner()

  const [activeDragItem, setActiveDragItem] = useState<PaletteItemProps | Component | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalysisSheetOpen, setIsAnalysisSheetOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false)
  const [highlightedComponentIds, setHighlightedComponentIds] = useState<string[]>([])
  const [showComponentNames, setShowComponentNames] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px of movement before drag starts
      },
    }),
  )

  const handleDragStart = (event: any) => {
    const currentDragData = event.active.data.current
    if (!currentDragData) {
      return
    }

    if (currentDragData.isPaletteItem && currentDragData.itemData) {
      setActiveDragItem(currentDragData.itemData as PaletteItemProps)
    } else if (!currentDragData.isPaletteItem && currentDragData.componentData) {
      const component = currentDragData.componentData as Component
      setActiveDragItem(component)
      setSelectedComponent(component)
      setIsSettingsSheetOpen(true)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event
    setActiveDragItem(null)

    if (!active.data.current) {
      setActiveDragItem(null)
      return // Exit if no current data on active item
    }

    const currentData = active.data.current

    if (currentData.isPaletteItem && currentData.itemData && over?.id === "canvas") {
      const paletteItem = currentData.itemData as PaletteItemProps
      const dropPosition = {
        x: (active.rect.current.initial?.left ?? 0) + delta.x - 200, // Assuming palette width 200
        y: (active.rect.current.initial?.top ?? 0) + delta.y - 64, // Assuming header height 64
      }
      if (paletteItem.type) {
        // Ensure type exists before calling addComponent
        addComponent(paletteItem.type as ComponentType, dropPosition)
      } else {
        console.error("Palette item missing type:", paletteItem)
      }
    } else if (!currentData.isPaletteItem && currentData.componentData && (delta.x !== 0 || delta.y !== 0)) {
      // Item moved on canvas
      moveComponent(active.id as string, delta)
    }
  }

  const handleAnalyze = () => {
    const result = analyzeArchitecture()
    setAnalysisResult(result)
    setIsAnalysisSheetOpen(true)
    setHighlightedComponentIds([]) // Clear previous highlights
  }

  const handleClear = () => {
    clearArchitecture()
    setAnalysisResult(null)
    setHighlightedComponentIds([])
  }

  const handleRecommendationClick = (recommendation: Recommendation) => {
    setHighlightedComponentIds(recommendation.relatedComponents || [])
  }

  const handleComponentClick = (componentId: string) => {
    const component = components[componentId]
    if (component) {
      setSelectedComponent(component)
      setIsSettingsSheetOpen(true)
    }
  }

  const handleSaveSettings = (updatedData: Partial<Omit<Component, "id" | "position">>) => {
    if (selectedComponent) {
      updateComponentData(selectedComponent.id, updatedData)
      setSelectedComponent((prev) => (prev ? { ...prev, ...updatedData } : null)) // Update local state for immediate reflection
    }
    // setIsSettingsSheetOpen(false); // Keep open or close based on preference
  }

  const getSeverityBadgeColor = (severity: Recommendation["severity"]) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "orange" // Custom color, ensure defined in tailwind.config
      case "Medium":
        return "yellow" // Custom color
      case "Low":
        return "blue" // Custom color
      default:
        return "secondary"
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen overflow-hidden bg-muted/40">
        <DesignerPalette items={paletteItems} />
        <main className="flex-1 flex flex-col relative">
          <header className="sticky top-0 z-10 flex h-[60px] items-center gap-4 border-b bg-background px-6">
            <h1 className="text-xl font-semibold">Zero Trust Architecture Designer</h1>
            <div className="ml-auto flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setShowComponentNames(!showComponentNames)}>
                      {showComponentNames ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showComponentNames ? "Hide" : "Show"} Component Names</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAnalyze}
                      disabled={Object.keys(components).length === 0}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Analyze Architecture</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => selectedComponent && setIsSettingsSheetOpen(true)}
                      disabled={!selectedComponent}
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Component Settings</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive" size="icon" onClick={handleClear}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear Canvas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </header>
          <div
            className="flex-1 overflow-auto p-4"
            onClick={() => {
              // Deselect component if clicking on canvas background
              // This needs a more robust check, e.g., event.target is the canvas itself
              // setSelectedComponent(null);
              // setIsSettingsSheetOpen(false);
              // setHighlightedComponentIds([]);
            }}
          >
            <DesignerCanvas
              components={components}
              connections={connections}
              addConnection={addConnection}
              highlightedComponentIds={highlightedComponentIds}
              // Pass handleComponentClick to DesignerCanvas if clicks are handled there
            />
          </div>
        </main>

        {/* Drag Overlay for smooth dragging from palette */}
        <DragOverlay dropAnimation={null}>
          {activeDragItem && "type" in activeDragItem && paletteItems.find((p) => p.type === activeDragItem.type) && (
            <div className="p-2 bg-primary text-primary-foreground rounded-md shadow-lg flex items-center gap-2 cursor-grabbing">
              {
                (paletteItems.find((p) => p.type === (activeDragItem as PaletteItemProps).type) as PaletteItemProps)
                  .icon
              }
              <span>{(activeDragItem as PaletteItemProps).name}</span>
            </div>
          )}
          {activeDragItem && "type" in activeDragItem && components[(activeDragItem as Component).id] && (
            <div className="p-3 bg-card border rounded-lg shadow-xl flex flex-col items-center w-28 opacity-75 cursor-grabbing">
              <div className="text-primary">
                {paletteItems.find((p) => p.type === (activeDragItem as Component).type)?.icon || (
                  <Laptop className="h-6 w-6" />
                )}
              </div>
              <p className="text-xs mt-1 text-center truncate w-full">
                {(activeDragItem as Component).name || (activeDragItem as Component).type}
              </p>
            </div>
          )}
        </DragOverlay>

        <Sheet open={isAnalysisSheetOpen} onOpenChange={setIsAnalysisSheetOpen}>
          <SheetContent className="sm:max-w-lg w-[90vw] flex flex-col">
            <SheetHeader>
              <SheetTitle>Architecture Analysis Report</SheetTitle>
              <SheetDescription>{analysisResult?.summary || "No analysis performed yet."}</SheetDescription>
              {analysisResult && (
                <div className="pt-2">
                  <Badge
                    variant={
                      analysisResult.score > 75 ? "success" : analysisResult.score > 50 ? "yellow" : "destructive"
                    }
                  >
                    Score: {analysisResult.score}/100
                  </Badge>
                </div>
              )}
            </SheetHeader>
            <ScrollArea className="flex-grow pr-6 -mr-6">
              {" "}
              {/* Added pr-6 and -mr-6 for scrollbar */}
              {analysisResult && analysisResult.recommendations.length > 0 ? (
                <div className="space-y-4 py-4">
                  {analysisResult.recommendations.map((rec) => (
                    <Card
                      key={rec.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleRecommendationClick(rec)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <Badge variant={getSeverityBadgeColor(rec.severity)}>{rec.severity}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="text-muted-foreground">{rec.description}</p>
                        {rec.remediation && (
                          <p className="mt-2 text-xs">
                            <strong>Suggestion:</strong> {rec.remediation}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : analysisResult ? (
                <p className="text-center py-8 text-muted-foreground">No specific recommendations. Looks good!</p>
              ) : null}
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <SheetClose asChild>
                <Button type="button">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Sheet open={isSettingsSheetOpen} onOpenChange={setIsSettingsSheetOpen}>
          <SheetContent className="sm:max-w-md w-[90vw]">
            <SheetHeader>
              <SheetTitle>Component Settings: {selectedComponent?.name || selectedComponent?.type}</SheetTitle>
              <SheetDescription>Modify the properties of the selected component.</SheetDescription>
            </SheetHeader>
            {selectedComponent && (
              <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="componentName">Name</Label>
                  <Input
                    id="componentName"
                    value={selectedComponent.name || ""}
                    onChange={(e) => setSelectedComponent((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                  />
                </div>
                <div>
                  <Label htmlFor="componentType">Type</Label>
                  <Select
                    value={selectedComponent.type}
                    onValueChange={(value) =>
                      setSelectedComponent((prev) => (prev ? { ...prev, type: value as ComponentType } : null))
                    }
                  >
                    <SelectTrigger id="componentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paletteItems.map((item) => (
                        <SelectItem key={item.id} value={item.type}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="componentTags">Tags (comma-separated)</Label>
                  <Input
                    id="componentTags"
                    value={selectedComponent.tags?.join(", ") || ""}
                    onChange={(e) =>
                      setSelectedComponent((prev) =>
                        prev
                          ? {
                              ...prev,
                              tags: e.target.value
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter(Boolean),
                            }
                          : null,
                      )
                    }
                    placeholder="e.g., critical, pci-dss, legacy"
                  />
                </div>
                {/* Add more settings as needed */}
              </div>
            )}
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button
                onClick={() =>
                  selectedComponent &&
                  handleSaveSettings({
                    name: selectedComponent.name,
                    type: selectedComponent.type,
                    tags: selectedComponent.tags,
                  })
                }
              >
                Save Changes
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </DndContext>
  )
}
