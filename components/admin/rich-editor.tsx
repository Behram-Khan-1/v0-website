"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export interface ContentBlock {
  id: string
  type: "text" | "image" | "video" | "gif"
  content: string
}

interface RichEditorProps {
  title: string
  onTitleChange: (title: string) => void
  excerpt: string
  onExcerptChange: (excerpt: string) => void
  featuredImage: string
  onFeaturedImageChange: (url: string) => void
  blocks: ContentBlock[]
  onBlocksChange: (blocks: ContentBlock[]) => void
}

export function RichEditor({
  title,
  onTitleChange,
  excerpt,
  onExcerptChange,
  featuredImage,
  onFeaturedImageChange,
  blocks,
  onBlocksChange,
}: RichEditorProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [gifUrl, setGifUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [textContent, setTextContent] = useState("")

  const addTextBlock = () => {
    if (textContent.trim()) {
      onBlocksChange([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "text",
          content: textContent,
        },
      ])
      setTextContent("")
    }
  }

  const addImageBlock = () => {
    if (imageUrl.trim()) {
      onBlocksChange([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "image",
          content: imageUrl,
        },
      ])
      setImageUrl("")
    }
  }

  const addVideoBlock = () => {
    if (youtubeUrl.trim()) {
      onBlocksChange([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "video",
          content: youtubeUrl,
        },
      ])
      setYoutubeUrl("")
    }
  }

  const addGifBlock = () => {
    if (gifUrl.trim()) {
      onBlocksChange([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "gif",
          content: gifUrl,
        },
      ])
      setGifUrl("")
    }
  }

  const removeBlock = (id: string) => {
    onBlocksChange(blocks.filter((b) => b.id !== id))
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((b) => b.id === id)
    if ((direction === "up" && index > 0) || (direction === "down" && index < blocks.length - 1)) {
      const newBlocks = [...blocks]
      const newIndex = direction === "up" ? index - 1 : index + 1
      ;[newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]]
      onBlocksChange(newBlocks)
    }
  }

  return (
    <div className="space-y-6">
      {/* Title and Excerpt */}
      <Card>
        <CardHeader>
          <CardTitle>Content Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Enter title" />
          </div>
          <div>
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea
              value={excerpt}
              onChange={(e) => onExcerptChange(e.target.value)}
              placeholder="Enter excerpt"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Featured Image URL</label>
            <Input
              value={featuredImage}
              onChange={(e) => onFeaturedImageChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Blocks */}
      <Card>
        <CardHeader>
          <CardTitle>Content Blocks</CardTitle>
          <CardDescription>Add text, images, videos, and GIFs to your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="gif">GIF</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-2">
              <Textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter text content..."
                rows={4}
              />
              <Button onClick={addTextBlock}>Add Text Block</Button>
            </TabsContent>

            <TabsContent value="image" className="space-y-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button onClick={addImageBlock}>Add Image Block</Button>
            </TabsContent>

            <TabsContent value="video" className="space-y-2">
              <Input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <Button onClick={addVideoBlock}>Add YouTube Video</Button>
            </TabsContent>

            <TabsContent value="gif" className="space-y-2">
              <Input
                value={gifUrl}
                onChange={(e) => setGifUrl(e.target.value)}
                placeholder="https://example.com/animation.gif"
              />
              <Button onClick={addGifBlock}>Add GIF Block</Button>
            </TabsContent>
          </Tabs>

          {/* Preview */}
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Content Preview</h3>
            {blocks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No content blocks yet</p>
            ) : (
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <div key={block.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {block.type === "text" && <p className="text-sm whitespace-pre-wrap">{block.content}</p>}
                        {block.type === "image" && (
                          <img
                            src={block.content || "/placeholder.svg"}
                            alt="Content"
                            className="max-w-full h-auto rounded"
                          />
                        )}
                        {block.type === "video" && (
                          <div className="aspect-video bg-black rounded">
                            <iframe
                              width="100%"
                              height="100%"
                              src={block.content.replace("watch?v=", "embed/")}
                              title="YouTube video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded"
                            />
                          </div>
                        )}
                        {block.type === "gif" && (
                          <img
                            src={block.content || "/placeholder.svg"}
                            alt="GIF"
                            className="max-w-full h-auto rounded"
                          />
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveBlock(block.id, "up")}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveBlock(block.id, "down")}
                          disabled={index === blocks.length - 1}
                        >
                          ↓
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogTitle>Delete Block</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this content block?
                            </AlertDialogDescription>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => removeBlock(block.id)}>Delete</AlertDialogAction>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
