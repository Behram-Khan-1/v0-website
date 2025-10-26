import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth is handled on individual pages instead
  return <>{children}</>
}
