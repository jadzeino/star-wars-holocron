import { Outlet, Link, useLocation } from 'react-router-dom'

export default function MainLayout() {
  const { pathname } = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <header className="w-full max-w-4xl py-6 mb-8 border-b-2 border-sw-yellow/50">
        <h1 className="text-4xl md:text-5xl font-bold text-sw-yellow text-center tracking-widest uppercase pb-4">
          Star Wars Holocron
        </h1>
        <nav className="flex justify-center gap-6 mt-4">
          <Link 
            to="/" 
            className={`text-lg uppercase tracking-wider hover:text-sw-yellow transition-colors ${pathname === '/' ? 'text-sw-yellow font-bold' : 'text-gray-400'}`}
          >
            Home
          </Link>
          <Link 
            to="/films" 
            className={`text-lg uppercase tracking-wider hover:text-sw-yellow transition-colors ${pathname.includes('films') ? 'text-sw-yellow font-bold' : 'text-gray-400'}`}
          >
            Films
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 w-full max-w-4xl">
        <Outlet />
      </main>
      
      <footer className="mt-12 py-6 text-center text-gray-500 text-sm w-full border-t border-sw-yellow/20">
        <p>Data from SWAPI. May the force be with you.</p>
      </footer>
    </div>
  )
}
