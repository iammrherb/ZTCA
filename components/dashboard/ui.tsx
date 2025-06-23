"use client"

import React from "react"
import { motion } from "framer-motion"
import { RefreshCw, AlertTriangle, Bug, Maximize2, Minimize2 } from "lucide-react"

export const cn = (...inputs: (string | undefined | null | false)[]) => inputs.filter(Boolean).join(" ")

export const GlobalStyles = () => (
  <style>{`
    :root {
      --background-rgb: 10, 10, 20; 
      --foreground-rgb: 230, 230, 245; 
      --card-rgb: 20, 20, 35;
      --card-border-rgb: 45, 45, 75; 
      --primary-rgb: 0, 245, 212; 
      --secondary-rgb: 241, 91, 181;
      --accent-rgb: 155, 93, 229;
      --success-rgb: 16, 185, 129;
      --warning-rgb: 245, 158, 11;
      --danger-rgb: 239, 68, 68;
      --info-rgb: 59, 130, 246;
    }
    * { box-sizing: border-box; }
    body { 
      color: rgb(var(--foreground-rgb)); 
      background-color: rgb(var(--background-rgb)); 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
      margin: 0;
      padding: 0;
    }
    .quantum-grid-bg { 
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%; 
      z-index: -2; 
      background-image: 
        linear-gradient(rgba(var(--card-border-rgb), 0.15) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(var(--card-border-rgb), 0.15) 1px, transparent 1px); 
      background-size: 2.5rem 2.5rem; 
    }
    .aurora-bg { 
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%; 
      z-index: -1; 
      overflow: hidden; 
    }
    .aurora-bg::before, .aurora-bg::after { 
      content: ''; 
      position: absolute; 
      width: 140vmax; 
      height: 140vmax; 
      animation: aurora 25s infinite linear; 
    }
    .aurora-bg::before {
      top: 50%; 
      left: 50%; 
      background-image: 
        radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%), 
        radial-gradient(circle, rgba(var(--secondary-rgb), 0.1) 0%, transparent 50%); 
      transform: translate(-50%, -50%);
    }
    .aurora-bg::after {
      top: 40%;
      left: 60%;
      background-image: 
        radial-gradient(circle, rgba(var(--accent-rgb), 0.08) 0%, transparent 50%),
        radial-gradient(circle, rgba(var(--info-rgb), 0.08) 0%, transparent 50%);
      transform: translate(-50%, -50%);
      animation: aurora 25s infinite linear; 
      animation-delay: -12.5s;
    }
    @keyframes aurora { 
      0% { transform: translate(-50%, -50%) rotate(0deg) scale(1.2); } 
      50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.5); } 
      100% { transform: translate(-50%, -50%) rotate(360deg) scale(1.2); } 
    }
    ::-webkit-scrollbar { width: 8px; height: 8px; } 
    ::-webkit-scrollbar-track { background: transparent; } 
    ::-webkit-scrollbar-thumb { 
      background: rgba(var(--card-border-rgb), 0.8); 
      border-radius: 4px; 
    }
    ::-webkit-scrollbar-thumb:hover { 
      background: rgba(var(--card-border-rgb), 1); 
    }
    .glass-effect {
      background: rgba(var(--card-rgb), 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(var(--card-border-rgb), 0.5);
    }
    .neon-glow {
      box-shadow: 
        0 0 10px rgba(var(--primary-rgb), 0.5),
        0 0 20px rgba(var(--primary-rgb), 0.3),
        0 0 30px rgba(var(--primary-rgb), 0.1);
    }
    .gradient-text {
      background: linear-gradient(135deg, 
        rgb(var(--primary-rgb)), 
        rgb(var(--secondary-rgb)), 
        rgb(var(--accent-rgb))
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .chart-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 200px;
      color: rgb(var(--foreground-rgb), 0.6);
      font-style: italic;
      border: 1px dashed rgba(var(--card-border-rgb), 0.5);
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
    }
  `}</style>
)

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "glass" | "neon" | "gradient" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-black/20 border-white/10 hover:border-white/20",
    glass: "glass-effect",
    neon: "bg-black/30 border-white/20 neon-glow",
    gradient: "bg-gradient-to-br from-[rgba(var(--card-rgb),0.8)] to-[rgba(var(--card-rgb),0.4)] border-white/10",
  }
  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl border text-card-foreground shadow-2xl shadow-black/30 backdrop-blur-md transition-all duration-300",
        variants[variant],
        className,
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    />
  )
})
Card.displayName = "Card"

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "success"
    size?: "default" | "lg" | "sm" | "icon"
    loading?: boolean
  }
>(({ className, variant = "primary", size = "default", loading = false, ...props }, ref) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-[rgb(var(--primary-rgb))] to-[rgb(var(--accent-rgb))] text-black shadow-lg hover:shadow-xl hover:shadow-[rgb(var(--primary-rgb),0.25)] transition-all duration-300 transform hover:-translate-y-px",
    secondary: "bg-white/10 border border-white/20 text-white/90 hover:bg-white/20 hover:border-white/30",
    ghost: "hover:bg-white/10 text-white/80 hover:text-white",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg hover:shadow-red-500/25",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25",
  }
  const sizes = { default: "h-10 px-4 py-2", lg: "h-12 px-6", sm: "h-8 px-3 text-sm", icon: "h-10 w-10" }
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        loading && "cursor-wait",
        className,
      )}
      ref={ref}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
      {props.children}
    </button>
  )
})
Button.displayName = "Button"

export const ChartContainer = ({
  title,
  description,
  children,
  actions,
  fullscreen = false,
  onToggleFullscreen,
}: {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  fullscreen?: boolean
  onToggleFullscreen?: () => void
}) => (
  <Card variant="glass" className={cn("flex flex-col", fullscreen ? "fixed inset-4 z-50" : "h-full min-h-[450px]")}>
    <div className="p-6 border-b border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold gradient-text">{title}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {onToggleFullscreen && (
            <Button variant="ghost" size="icon" onClick={onToggleFullscreen}>
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
    <div className="flex-1 p-4">{children}</div>
  </Card>
)

export class DebugChartWrapper extends React.Component<
  { chartName: string; data: any; children: React.ReactNode; [key: string]: any },
  { hasError: boolean; error: Error | any | null } // Allow 'any' for error type initially
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error | any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error | any, errorInfo: React.ErrorInfo) {
    const { chartName } = this.props
    console.error(`[DebugChartWrapper: ${chartName}] CRASHED! Details below:`)
    console.error("Error object:", error)
    console.error("Error info:", errorInfo)
    // Log all props to help identify issues with data or configuration
    const { children, ...propsToLog } = this.props
    console.error("Props at time of crash:", propsToLog)
  }

  render() {
    const { chartName, children, data, ...props } = this.props
    const { hasError, error } = this.state

    if (hasError) {
      let errorMessageString = "An unknown error occurred."
      if (error) {
        if (error instanceof Error && typeof error.message === "string") {
          errorMessageString = error.message
        } else if (typeof error.toString === "function") {
          const preliminaryMessage = error.toString()
          // Avoid "[object Object]" if possible
          if (preliminaryMessage !== "[object Object]" || !error.message) {
            errorMessageString = preliminaryMessage
          } else {
            // If toString is "[object Object]" and error.message exists (even if not string)
            try {
              errorMessageString = `Error: ${JSON.stringify(error.message || error)}`
            } catch (e) {
              errorMessageString = "Could not stringify error message or error object."
            }
          }
        } else {
          try {
            errorMessageString = JSON.stringify(error)
          } catch (e) {
            errorMessageString = "Could not stringify error object."
          }
        }
      }

      let errorStackString = "No stack trace available."
      if (error instanceof Error && error.stack) {
        errorStackString = error.stack
      }

      return (
        <div className="chart-placeholder text-red-500">
          <AlertTriangle className="w-8 h-8 mb-2" />
          <p className="font-bold">Error rendering {chartName}.</p>
          <p className="text-xs text-gray-400 mt-1">Check browser console for detailed logs.</p>
          <details className="mt-2 text-xs text-left bg-black/20 p-2 rounded-md max-w-full overflow-auto">
            <summary className="cursor-pointer font-medium">Error Details</summary>
            <pre className="mt-1 whitespace-pre-wrap">Message: {errorMessageString}</pre>
            <pre className="mt-1 whitespace-pre-wrap">Stack: {errorStackString}</pre>
          </details>
        </div>
      )
    }

    // console.log(`[DebugChartWrapper: ${chartName}] Rendering with props:`, { data, ...props })

    if (data === undefined || data === null) {
      // console.warn(`[DebugChartWrapper: ${chartName}] 'data' prop is undefined or null.`)
      return <div className="chart-placeholder">Data for {chartName} is not available.</div>
    }

    if (Array.isArray(data) && data.length === 0) {
      return <div className="chart-placeholder">No data to display for {chartName}.</div>
    }

    return children
  }
}

export const DebugInfo = ({ config, filters, data }: { config: any; filters: any; data: any[] }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setIsOpen(!isOpen)} variant="secondary" size="sm">
        <Bug className="w-4 h-4 mr-2" />
        Debug Info
      </Button>
      {isOpen && (
        <Card variant="glass" className="absolute bottom-full right-0 w-96 max-h-96 overflow-auto p-4 mb-2">
          <h4 className="font-bold text-sm gradient-text">Config</h4>
          <pre className="text-xs bg-black/50 p-2 rounded max-h-40 overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
          <h4 className="font-bold text-sm mt-2 gradient-text">Filters</h4>
          <pre className="text-xs bg-black/50 p-2 rounded max-h-40 overflow-auto">
            {JSON.stringify(filters, null, 2)}
          </pre>
          <h4 className="font-bold text-sm mt-2 gradient-text">Processed Data</h4>
          <pre className="text-xs bg-black/50 p-2 rounded">{data?.length || 0} vendors</pre>
        </Card>
      )}
    </div>
  )
}
