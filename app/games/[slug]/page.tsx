"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

interface ContentBlock {
  type: "text" | "image" | "video" | "gif"
  content: string
}

interface Game {
  id: string
  title: string
  slug: string
  content: ContentBlock[]
  featured_image_url: string
  created_at: string
}

export default function GameDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setIsAdmin(!!user)

        const { data, error } = await supabase.from("games").select("*").eq("slug", slug).single()

        if (error) throw error
        setGame(data)
      } catch (error) {
        console.error("Error fetching game:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [slug, supabase])

  if (loading) return <div className="p-8">Loading...</div>
  if (!game) return <div className="p-8">Game not found</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/games">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Back to Games
          </Button>
        </Link>

        {isAdmin && (
          <Link href={`/admin/dashboard?edit=game&id=${game.id}`}>
            <Button className="mb-6 ml-2">Edit Game</Button>
          </Link>
        )}

        <article>
          {game.featured_image_url && (
            <img
              src={game.featured_image_url || "/placeholder.svg"}
              alt={game.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
          <p className="text-muted-foreground mb-8">{new Date(game.created_at).toLocaleDateString()}</p>

          <div className="prose prose-invert max-w-none">
            {game.content?.map((block, idx) => (
              <div key={idx} className="mb-6">
                {block.type === "text" && <p>{block.content}</p>}
                {block.type === "image" && (
                  <img src={block.content || "/placeholder.svg"} alt="Content" className="w-full rounded-lg" />
                )}
                {block.type === "video" && (
                  <iframe
                    width="100%"
                    height="400"
                    src={block.content}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg"
                  />
                )}
                {block.type === "gif" && (
                  <img src={block.content || "/placeholder.svg"} alt="GIF" className="w-full rounded-lg" />
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
