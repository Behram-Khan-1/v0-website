-- Insert Old School RuneScape game data
INSERT INTO games (title, slug, excerpt, featured_image_url, year, tags, content, is_draft, created_at, updated_at)
VALUES (
  'Old School RuneScape',
  'old-school-runescape',
  'Worked with the engine team to support the operation and on-going enhancement of the RS engine and associated systems.',
  '/assets/images/covers/Games/Professional/OldSchoolRunescape.png',
  'May 2021 - Aug 2021',
  ARRAY['Engine Programming', 'C++', 'RuneScript', 'MMORPG'],
  '[
    {
      "type": "text",
      "content": "Old School RuneScape is one of the world''s largest and most popular MMORPG''s. It features a persistent world in which players can interact with each other and the environment. This is the open world you know and love, but as it was in 2007."
    },
    {
      "type": "text",
      "content": "I worked as an intern on the engine team to support the operation and on-going enhancement of the RS engine and associated systems."
    },
    {
      "type": "heading",
      "content": "My Contributions"
    },
    {
      "type": "text",
      "content": "Enhanced engine systems and contributed to the Steam client"
    },
    {
      "type": "text",
      "content": "Used C++ for client-side development and optimization"
    },
    {
      "type": "text",
      "content": "Developed a title screen volume slider from scratch, handling sprite rendering and data persistence"
    },
    {
      "type": "text",
      "content": "Gained insight into engine programming, including how it differs from gameplay programming"
    },
    {
      "type": "text",
      "content": "Modified in-game behaviour using RuneScript"
    },
    {
      "type": "text",
      "content": "Gained experience with using Git commands with Git Bash"
    },
    {
      "type": "text",
      "content": "Participated in code reviews and sprint planning"
    },
    {
      "type": "text",
      "content": "Gained firsthand experience working on a live MMORPG"
    },
    {
      "type": "youtube",
      "url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ]',
  false,
  NOW(),
  NOW()
);
