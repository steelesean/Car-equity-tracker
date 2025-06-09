import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import supabase from '../utils/supabase'

export default function Home() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user)
        router.push('/dashboard')
      }
    })
  }, [])

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/dashboard')
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert("Check your email to confirm sign up")
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login or Sign Up</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  )
}