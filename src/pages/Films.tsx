import { useQuery } from '@tanstack/react-query'
import { fetchFilms } from '../api/swapi'

export default function Films() {
  const { data: films, error, isLoading } = useQuery({
    queryKey: ['films'],
    queryFn: fetchFilms
  })

  if (isLoading) return <div>Loading holocron data...</div>
  
  if (error) return <div>Error loading films!</div>

  return (
    <div>
      <h2>Star Wars Films</h2>
      <ul>
        {films?.map((film: any) => (
          <li key={film.episode_id}>
            <strong>{film.title}</strong> (Episode {film.episode_id})
            <p>{film.opening_crawl.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
