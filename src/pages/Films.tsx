import { useQuery } from '@tanstack/react-query'
import { fetchFilms } from '../api/swapi'

export default function Films() {
  const { data: films, error, isLoading } = useQuery({
    queryKey: ['films'],
    queryFn: fetchFilms
  })

  if (isLoading) return <div className="text-center text-sw-yellow text-xl loading-pulse">Loading holocron data...</div>
  
  if (error) return <div className="text-red-500 text-center">Error loading films! The dark side clouds our vision.</div>

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-sw-yellow font-bold mb-8 uppercase tracking-wider border-b border-sw-yellow/30 pb-2">The Skywalker Saga</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {films?.map((film: any) => (
          <div key={film.episode_id} className="border border-sw-yellow/30 p-6 rounded-lg bg-black hover:border-sw-yellow transition-all cursor-pointer group hover:-translate-y-1 duration-300 shadow-lg shadow-sw-yellow/5">
            <h3 className="text-2xl font-bold text-white group-hover:text-sw-yellow transition-colors mb-2">
              {film.title}
            </h3>
            <div className="text-sw-yellow/80 text-sm font-semibold tracking-widest mb-4">EPISODE {film.episode_id}</div>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {film.opening_crawl}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
