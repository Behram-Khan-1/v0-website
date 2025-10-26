"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { RichEditor, type ContentBlock } from "@/components/admin/rich-editor"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditorPage() {
  const router = useRouter()
  const params = useParams()
  const type = params.type as string
  const id = params.id as string

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [year, setYear] = useState("")
  const [tagsInput, setTagsInput] = useState("")
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [isDraft, setIsDraft] = useState(true)
  const [loading, setLoading] = useState(id !== "new")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id !== "new") {
      fetchContent()
    }
  }, [id, type])

  const fetchContent = async () => {
    const supabase = getSupabaseClient()
    const { data, error: fetchError } = await supabase
      .from(type + "s")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError) {
      setError("Failed to load content")
      setLoading(false)
      return
    }

    if (data) {
      setTitle(data.title)
      setExcerpt(data.excerpt || "")
      setFeaturedImage(data.featured_image_url || "")
      setYear(data.year || "")
      setTagsInput(data.tags ? data.tags.join(", ") : "")
      setBlocks(data.content || [])
      setIsDraft(data.is_draft)
    }
    setLoading(false)
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setSaving(true)
    setError(null)

    const supabase = getSupabaseClient()
    const slug = generateSlug(title)
    const tableName = type + "s"
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const payload = {
      title,
      slug,
      excerpt,
      featured_image_url: featuredImage,
      year,
      tags,
      content: blocks,
      is_draft: !publish,
      updated_at: new Date().toISOString(),
    }

    try {
      if (id === "new") {
        const { error: insertError } = await supabase.from(tableName).insert([payload])

        if (insertError) throw insertError
      } else {
        const { error: updateError } = await supabase.from(tableName).update(payload).eq("id", id)

        if (updateError) throw updateError
      }

      router.push("/admin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {id === "new" ? "Create New" : "Edit"} {type.charAt(0).toUpperCase() + type.slice(1)}
          </h1>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 mb-6 p-4 border rounded-lg bg-muted/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Year / Date</Label>
              <Input
                id="year"
                placeholder="e.g., 2024, April 2024, Ongoing"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                placeholder="e.g., Solo, Tools, UGC"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        <RichEditor
          title={title}
          onTitleChange={setTitle}
          excerpt={excerpt}
          onExcerptChange={setExcerpt}
          featuredImage={featuredImage}
          onFeaturedImageChange={setFeaturedImage}
          blocks={blocks}
          onBlocksChange={setBlocks}
        />

        <div className="flex gap-4 mt-8">
          <Button onClick={() => handleSave(false)} variant="outline" disabled={saving}>
            {saving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button onClick={() => handleSave(true)} disabled={saving}>
            {saving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </main>
    </div>
  )
}
