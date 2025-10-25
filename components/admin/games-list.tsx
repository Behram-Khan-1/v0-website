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

interface Game {
  id: string
  title: string
  slug: string
  is_draft: boolean
  created_at: string
}

export function GamesList() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("games")
      .select("id, title, slug, is_draft, created_at")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setGames(data)
    }
    setLoading(false)
  }

  const deleteGame = async (id: string) => {
    const supabase = getSupabaseClient()
    await supabase.from("games").delete().eq("id", id)
    setGames(games.filter((g) => g.id !== id))
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
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.title}</TableCell>
              <TableCell>
                <Badge variant={game.is_draft ? "secondary" : "default"}>{game.is_draft ? "Draft" : "Published"}</Badge>
              </TableCell>
              <TableCell>{new Date(game.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/admin/editor/game/${game.id}`}>
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
                    <AlertDialogTitle>Delete Game</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this game? This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteGame(game.id)}>Delete</AlertDialogAction>
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
