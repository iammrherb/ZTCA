"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutGrid, LineChart, Rocket } from "lucide-react"
import Link from "next/link"

const data = [
  {
    feature: "Real-time Monitoring",
    openNAC: "Yes",
    competingSolution: "Limited",
  },
  {
    feature: "Automated Threat Response",
    openNAC: "Yes",
    competingSolution: "No",
  },
  {
    feature: "Network Segmentation",
    openNAC: "Yes",
    competingSolution: "Yes",
  },
  {
    feature: "User Authentication",
    openNAC: "Yes",
    competingSolution: "Yes",
  },
  {
    feature: "Compliance Reporting",
    openNAC: "Yes",
    competingSolution: "Limited",
  },
]

export default function ClientPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:border-primary/80 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-muted rounded-md">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Network Overview</CardTitle>
            </div>
            <CardDescription>Visualize your network traffic and identify potential bottlenecks.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for network overview chart */}
            <div className="h-40 bg-muted rounded-md" />
          </CardContent>
        </Card>

        <Card className="hover:border-primary/80 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-muted rounded-md">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Automated Threat Response</CardTitle>
            </div>
            <CardDescription>Automatically isolate and mitigate threats in real-time.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button variant="outline" className="w-full">
              View Incidents
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Feature Comparison Matrix</CardTitle>
            <CardDescription>See how OpenNAC stacks up against competing solutions.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableCaption>A comparison of OpenNAC features vs. competing solutions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead>OpenNAC</TableHead>
                  <TableHead>Competing Solution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell>{row.openNAC}</TableCell>
                    <TableCell>{row.competingSolution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/80 transition-colors flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-muted rounded-md">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Architecture Designer</CardTitle>
            </div>
            <CardDescription>
              Visually design your network architecture and get NAC placement recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Link href="/designer" className="w-full">
              <Button variant="outline" className="w-full">
                Open Designer
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
