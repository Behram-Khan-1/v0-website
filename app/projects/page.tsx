"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string
  is_draft: boolean
  created_at: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setIsAdmin(!!user)

        const query = supabase.from("projects").select("*").order("created_at", { ascending: false })

        if (!user) {
          query.eq("is_draft", false)
        }

        const { data, error } = await query

        if (error) throw error
        setProjects(data || [])
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [supabase])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Projects</h1>
          {isAdmin && (
            <Link href="/admin/dashboard">
              <Button>Admin Dashboard</Button>
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                {project.featured_image_url && (
                  <div
                    className="w-full h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.featured_image_url})` }}
                  />
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                  {project.is_draft && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded w-fit">Draft</span>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{project.excerpt}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-4">
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        )}
      </div>
    </div>
  )
}
