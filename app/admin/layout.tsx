import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getCurrentUser()

  if (!user) {
    redirect("/admin/login")
  }

  return <>{children}</>
}
