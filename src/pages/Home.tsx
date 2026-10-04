import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Services Imran</h1>
      <p>Welcome to Services Imran</p>
      <Link to="/services">View Services</Link>
    </div>
  )
}