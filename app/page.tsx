"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setIsAdmin(!!user)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [supabase])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black text-white z-50 opacity-95">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            Behram Khan
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/" className="hover:text-gray-300">
              HOME
            </Link>
            <Link href="/" className="hover:text-gray-300">
              HIGHLIGHTS
            </Link>
            <Link href="/" className="hover:text-gray-300">
              ABOUT
            </Link>
            <Link href="/games" className="hover:text-gray-300">
              GAMES
            </Link>
            <Link href="/projects" className="hover:text-gray-300">
              PROJECTS
            </Link>
            <Link href="/blogs" className="hover:text-gray-300">
              BLOG
            </Link>
            <div className="relative group">
              <button className="hover:text-gray-300">MORE</button>
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded hidden group-hover:block">
                <Link href="/curriculum-vitae" className="block px-4 py-2 text-gray-400 hover:text-white">
                  Curriculum Vitae
                </Link>
                <Link href="/devblogs" className="block px-4 py-2 text-gray-400 hover:text-white">
                  All Dev Blogs
                </Link>
                <Link href="/honours-awards" className="block px-4 py-2 text-gray-400 hover:text-white">
                  Honours & Awards
                </Link>
                <Link href="/studying" className="block px-4 py-2 text-gray-400 hover:text-white">
                  Studying
                </Link>
                <Link href="/volunteering" className="block px-4 py-2 text-gray-400 hover:text-white">
                  Volunteering
                </Link>
                <div className="border-t border-gray-700"></div>
                <Link href="/admin/login" className="block px-4 py-2 text-yellow-400 hover:text-yellow-300">
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden pt-16">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-10">
          <source src="/assets/videos/Games/games-showreel-june24.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Hi, I am Behram Khan</h1>
          <h3 className="text-2xl mb-8">I'm a Gameplay Programmer!</h3>
          <div className="flex gap-4 justify-center">
            <Link
              href="/games"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition"
            >
              Games
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition"
            >
              Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Highlight Card 1 */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="aspect-square bg-gray-300 flex items-center justify-center opacity-70">
                <img
                  src="/assets/images/covers/Games/Professional/SumoLogo.png"
                  alt="Unannounced AAA Unreal Game"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Unannounced AAA Unreal Game</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Working on a very exciting Unreal Engine project. I can't say much about this, but I'm learning lots
                  of amazing things on this project.
                </p>
                <p className="text-sm text-gray-500 mb-2">Developed by: NDA</p>
                <p className="text-xs text-gray-400">Jul 2025 - Present</p>
              </div>
            </div>

            {/* Highlight Card 2 */}
            <Link
              href="/games"
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="aspect-square bg-gray-300 flex items-center justify-center">
                <img
                  src="/assets/images/covers/Games/Professional/Stampede.png"
                  alt="Stampede Racing Royale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Stampede Racing Royale</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Worked with several programming teams to create an exciting MMO battle-royale-racing game from start
                  to release!
                </p>
                <p className="text-sm text-gray-500 mb-2">Developed by: Sumo Leamington</p>
                <p className="text-xs text-gray-400">Aug 2021 - Mar 2025</p>
              </div>
            </Link>

            {/* Highlight Card 3 */}
            <Link
              href="/games"
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="aspect-square bg-gray-300 flex items-center justify-center">
                <img
                  src="/assets/images/covers/Games/Professional/OldSchoolRunescape.png"
                  alt="Old School RuneScape"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Old School RuneScape</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Worked with the engine team to support the operation and on-going enhancement of the RuneScape engine
                  and associated systems.
                </p>
                <p className="text-sm text-gray-500 mb-2">Developed by: Jagex</p>
                <p className="text-xs text-gray-400">May 2021 - Aug 2021</p>
              </div>
            </Link>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/games"
              className="px-8 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition"
            >
              All Other Games
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <img src="/assets/images/profile.png" alt="Behram Khan" className="w-full rounded-full" />
            </div>
            <div className="md:col-span-3">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Hi! I'm Behram, a UK-based programmer. I love technical and creative experimentation, often
                participating in game jams and small projects. I enjoy exploring various genres and pushing my creative
                and technical boundaries. I'm always eager to learn, whether it's mastering game engines, diving into
                programming problems, or tackling fun projects with weird hardware. One of my goals is to inspire
                younger and diverse individuals to explore game development. I've mentored students, spoken at events,
                high schools, colleges and universities, and appeared as a panellist at events like the Women in Games
                Expo.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <i className="fas fa-trophy text-yellow-500"></i>
                  <span className="text-sm font-bold">Graduate of the Year: Programmer</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-trophy text-yellow-500"></i>
                  <span className="text-sm font-bold">Develop: Star Awards 2024 (Tomorrow's Star)</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-trophy text-yellow-500"></i>
                  <span className="text-sm font-bold">
                    TIGA Prize in Recognition for Outstanding Industry Engagement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 justify-center mb-8">
            <a
              href="mailto:behram@example.com"
              className="px-8 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition"
            >
              <i className="fas fa-envelope mr-2"></i>
              Send me an Email
            </a>
            <a
              href="https://www.linkedin.com/in/behram-khan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition"
            >
              <i className="fab fa-linkedin mr-2"></i>
              Connect on LinkedIn
            </a>
          </div>
          <h3 className="text-lg font-bold mb-6">You Can Also Find Me Here...</h3>
          <div className="flex gap-6 justify-center">
            <a
              href="https://www.linkedin.com/in/behram-khan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-black hover:text-gray-600"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://www.github.com/behram-khan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-black hover:text-gray-600"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://behramkhan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-black hover:text-gray-600"
            >
              <i className="fa fa-house"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex gap-4 mb-4">
                <img src="/assets/images/profile.png" alt="Behram Khan" className="w-16 h-16 rounded-full" />
                <div className="text-left">
                  <h5 className="font-bold">Behram Khan</h5>
                  <p className="text-gray-400 text-sm">Hi! I'm Behram, a UK-based programmer...</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/behram-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://www.github.com/behram-khan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://behramkhan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fa fa-house"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Recent Posts</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <Link href="/blogs" className="hover:text-white">
                    Navigating My Programming Career
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white">
                    I Learnt About SFML & CMake
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white">
                    Collaborating on a Game Pitch
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Behram Khan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
