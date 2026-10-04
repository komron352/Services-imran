import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Services() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    api.getServices().then((d: any) => setItems(d))
  }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>Services</h2>
      {items.map((s: any) => (
        <div key={s.id}>{s.name}</div>
      ))}
    </div>
  )
}