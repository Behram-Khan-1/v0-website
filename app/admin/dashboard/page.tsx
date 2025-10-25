"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signOut } from "@/lib/supabase/auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogsList } from "@/components/admin/blogs-list"
import { ProjectsList } from "@/components/admin/projects-list"
import { GamesList } from "@/components/admin/games-list"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("blogs")

  const handleLogout = async () => {
    await signOut()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Blogs</h2>
              <Link href="/admin/editor/blog/new">
                <Button>Create New Blog</Button>
              </Link>
            </div>
            <BlogsList />
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Projects</h2>
              <Link href="/admin/editor/project/new">
                <Button>Create New Project</Button>
              </Link>
            </div>
            <ProjectsList />
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Games</h2>
              <Link href="/admin/editor/game/new">
                <Button>Create New Game</Button>
              </Link>
            </div>
            <GamesList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
