"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"

interface ContentItem {
  id: string
  title: string
  year?: string
  tags?: string[]
  is_draft: boolean
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("blogs")
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [blogs, setBlogs] = useState<ContentItem[]>([])
  const [projects, setProjects] = useState<ContentItem[]>([])
  const [games, setGames] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    fetchAllContent()
  }, [])

  const fetchAllContent = async () => {
    const supabase = getSupabaseClient()

    try {
      const [blogsRes, projectsRes, gamesRes] = await Promise.all([
        supabase.from("blogs").select("id, title, year, tags, is_draft"),
        supabase.from("projects").select("id, title, year, tags, is_draft"),
        supabase.from("games").select("id, title, year, tags, is_draft"),
      ])

      if (blogsRes.data) setBlogs(blogsRes.data)
      if (projectsRes.data) setProjects(projectsRes.data)
      if (gamesRes.data) setGames(gamesRes.data)
    } catch (err) {
      setError("Failed to load content")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    const supabase = getSupabaseClient()
    const { error: deleteError } = await supabase
      .from(type + "s")
      .delete()
      .eq("id", id)

    if (deleteError) {
      setError("Failed to delete")
      return
    }

    fetchAllContent()
  }

  const handleArchive = async (type: string, id: string, isDraft: boolean) => {
    const supabase = getSupabaseClient()
    const { error: updateError } = await supabase
      .from(type + "s")
      .update({ is_draft: !isDraft })
      .eq("id", id)

    if (updateError) {
      setError("Failed to update")
      return
    }

    fetchAllContent()
  }

  const renderContentList = (items: ContentItem[], type: string) => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-muted-foreground">No {type}s yet. Create one to get started!</p>
      ) : (
        items.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.year}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs mt-2 text-muted-foreground">Status: {item.is_draft ? "Draft" : "Published"}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/editor/${type}/${item.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handleArchive(type, item.id, item.is_draft)}>
                    {item.is_draft ? "Publish" : "Archive"}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(type, item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (err) {
      setError("Logout failed")
    }
  }

  if (!mounted) return null

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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
            {loading ? <p>Loading...</p> : renderContentList(blogs, "blog")}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Projects</h2>
              <Link href="/admin/editor/project/new">
                <Button>Create New Project</Button>
              </Link>
            </div>
            {loading ? <p>Loading...</p> : renderContentList(projects, "project")}
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Games</h2>
              <Link href="/admin/editor/game/new">
                <Button>Create New Game</Button>
              </Link>
            </div>
            {loading ? <p>Loading...</p> : renderContentList(games, "game")}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
