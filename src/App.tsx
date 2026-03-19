import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import Films from './pages/Films'
import FilmDetail from './pages/FilmDetail'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="films" element={<Films />} />
          <Route path="films/:id" element={<FilmDetail />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
