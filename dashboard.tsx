import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import supabase from '../utils/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/')
      else {
        setUser(user)
        fetchVehicles(user.id)
      }
    })
  }, [])

  const fetchVehicles = async (userId) => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', userId)
    if (error) console.error(error)
    else setVehicles(data)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <ul>
        {vehicles.map(v => (
          <li key={v.id}>{v.make} {v.model} - Reg: {v.reg_number}</li>
        ))}
      </ul>
    </div>
  )
}