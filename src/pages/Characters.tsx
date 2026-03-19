import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchResource } from '../api/swapi';

export default function Characters() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ['characters', page],
    // 'people' is the exact endpoint name in swapi
    queryFn: () => fetchResource('people', page),
  });

  if (isLoading) return <div className="text-center text-sw-yellow pt-10">Scanning for lifeforms...</div>;
  if (error) return <div className="text-red-500 text-center">Failed to load characters.</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-sw-yellow font-bold uppercase tracking-wider mb-8 border-b border-sw-yellow/30 pb-2">
        Galactic Citizens
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.results?.map((person: any) => (
          <div key={person.name} className="border border-sw-yellow/20 p-5 bg-black hover:border-sw-yellow transition-all">
            <h3 className="font-bold text-white text-xl mb-3">{person.name}</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Height: <span className="text-sw-yellow/80">{person.height} cm</span></p>
              <p>Mass: <span className="text-sw-yellow/80">{person.mass} kg</span></p>
              <p>Gender: <span className="text-sw-yellow/80">{person.gender}</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-12 bg-black/40 p-4 border border-sw-yellow/10">
        <button 
          disabled={!data?.previous}
          onClick={() => setPage(old => Math.max(1, old - 1))}
          className="border border-sw-yellow px-6 py-2 uppercase hover:bg-sw-yellow hover:text-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sw-yellow font-bold">Page {page}</span>
        <button 
          disabled={!data?.next}
          onClick={() => setPage(old => old + 1)}
          className="border border-sw-yellow px-6 py-2 uppercase hover:bg-sw-yellow hover:text-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}
