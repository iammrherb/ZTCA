"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface GrokAnalysisDialogProps {
  data: any
  type: "executive-summary" | "architecture-analysis" | "vendor-comparison" | "compliance-guidance"
  title: string
  description: string
  children?: React.ReactNode
}

export function GrokAnalysisDialog({ data, type, title, description, children }: GrokAnalysisDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [analysis, setAnalysis] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const generateAnalysis = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/grok-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          analysisData: data,
          type: type,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate analysis")
      }

      const result = await response.json()
      setAnalysis(result.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open && !analysis && !isLoading) {
      generateAnalysis()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Analysis
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            {title}
            <Badge variant="secondary" className="ml-2">
              Powered by Grok
            </Badge>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-6">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Generating AI analysis...</span>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive">Error: {error}</p>
              <Button variant="outline" size="sm" onClick={generateAnalysis} className="mt-2">
                Retry Analysis
              </Button>
            </div>
          )}

          {analysis && (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{analysis}</div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
