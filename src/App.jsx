import { useEffect, useState } from 'react'
import { client } from './supabase/client'
import { LoginButton } from './components/LoginButton'
import { LogoutButton } from './components/LogoutButton'
import { LinkForm } from './components/LinkForm'
import { LinksList } from './components/LinksList'

export default function App () {
  const [isAuth, setAuth] = useState(false)
  const [session, setSession] = useState(null)

  const [links, setLinks] = useState([])

  const fetchLinks = async () => {
    const { data } = await client.from('links').select().order('created_at', { ascending: false })

    setLinks(data)
  }

  const handleLoginWithGithub = async () => {
    try {
      await client.auth.signInWithOAuth({
        provider: 'github'
      })
    } catch (error) {
      console.error('Error logging in with Github:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await client.auth.signOut()
      setAuth(false)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  useEffect(() => {
    client.auth.onAuthStateChange((event, info) => {
      if (info) {
        setSession(info.user)
      }
    })
  }, [])

  useEffect(() => {
    setAuth(session !== null)
  }, [session])

  if (!isAuth) return <LoginButton onClick={handleLoginWithGithub} />

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-center gap-4 mt-4">
        <img
          className="w-24 rounded-full inline-block ml-2"
          src={session.user_metadata.avatar_url}
          alt={session.user_metadata.full_name}
        />
        <h1 className="text-3xl font-bold">
          Welcome {session.user_metadata.full_name}!
        </h1>

        <LogoutButton onClick={handleLogout} />

        <h2
          className='text-2xl font-bold text-gray-800 mt-8 '
        >Create new Link</h2>
        <LinkForm fetchLinks={fetchLinks}/>
      </div>

      <LinksList links={links} fetchLinks={fetchLinks}/>
    </div>
  )
}
