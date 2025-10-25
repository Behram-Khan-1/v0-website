"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Blog {
  id: string
  title: string
  slug: string
  is_draft: boolean
  created_at: string
}

export function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, slug, is_draft, created_at")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBlogs(data)
    }
    setLoading(false)
  }

  const deleteBlog = async (id: string) => {
    const supabase = getSupabaseClient()
    await supabase.from("blogs").delete().eq("id", id)
    setBlogs(blogs.filter((b) => b.id !== id))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>
                <Badge variant={blog.is_draft ? "secondary" : "default"}>{blog.is_draft ? "Draft" : "Published"}</Badge>
              </TableCell>
              <TableCell>{new Date(blog.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/admin/editor/blog/${blog.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Delete Blog</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this blog? This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteBlog(blog.id)}>Delete</AlertDialogAction>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
