import { Outlet, Link } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Star Wars Holocron</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/films">Films</Link></li>
          </ul>
        </nav>
      </header>
      
      <main className="content">
        <Outlet />
      </main>
      
      <footer>
        <p>Data from SWAPI. May the force be with you.</p>
      </footer>
    </div>
  )
}
