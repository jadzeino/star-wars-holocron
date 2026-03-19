import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFilmById } from '../api/swapi';
import OpeningCrawl from '../components/OpeningCrawl';
import { ArrowLeft } from 'lucide-react';

export default function FilmDetail() {
  const { id } = useParams();

  const { data: film, isLoading, error } = useQuery({
    queryKey: ['film', id],
    queryFn: () => fetchFilmById(id as string),
    enabled: !!id
  });

  if (isLoading) return <div className="text-center text-sw-yellow pt-20">Retrieving transmission...</div>;
  if (error || !film) return <div className="text-red-500 text-center pt-20">Error retrieving archives!</div>;

  return (
    <div className="animate-fade-in relative max-w-4xl mx-auto">
      <Link 
        to="/films" 
        className="inline-flex items-center gap-2 text-sw-yellow/80 hover:text-sw-yellow mb-4 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Films
      </Link>
      
      <div className="mt-8 border border-sw-yellow/30 bg-black/50 p-6 rounded-xl">
        <OpeningCrawl 
          episode={film.episode_id} 
          title={film.title} 
          crawlBody={film.opening_crawl} 
        />
        
        {/* We can add character maps and stuff here later */}
        <div className="mt-12 pt-6 border-t border-sw-yellow/20 text-gray-400">
          <p>Directed by: <span className="text-white">{film.director}</span></p>
          <p>Released: <span className="text-white">{film.release_date}</span></p>
        </div>
      </div>
    </div>
  )
}
