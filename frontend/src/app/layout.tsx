import { Inter } from "next/font/google"
import "../styles/globals.scss"
import "../styles/tailwind.css"
import "primeicons/primeicons.css"
import AppHeader from "@/components/core/app-header"
import QueryProvider from "@/context/query-provider"
import { api } from "@/services/api-client"
import { fetchLastRunTime } from "@/services/api/compressor-api"
import { HelpOverlayProvider } from "@/context/help-overlay-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "PLQ VCM",
  description: "Visualize compressor performance and control lines",
  keywords: ["compressor", "dashboard", "chart", "performance"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // common for all the routes
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased  bg-background px-4 `}>
        <QueryProvider>
          <HelpOverlayProvider>
            <AppHeader />
            {children}
          </HelpOverlayProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
