import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchResource } from '../api/swapi';

export default function Starships() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ['starships', page],
    queryFn: () => fetchResource('starships', page),
  });

  if (isLoading) return <div className="text-center text-sw-yellow pt-10">Scanning fleet...</div>;
  if (error) return <div className="text-red-500 text-center">Failed to locate starships.</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-sw-yellow font-bold uppercase tracking-wider mb-8 border-b border-sw-yellow/30 pb-2">
        Starships
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.results?.map((ship: any) => (
          <div key={ship.name} className="border border-sw-yellow/20 p-5 bg-black hover:border-sw-yellow transition-all">
            <h3 className="font-bold text-white text-xl mb-3">{ship.name}</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Model: <span className="text-sw-yellow/80">{ship.model}</span></p>
              <p>Manufacturer: <span className="text-sw-yellow/80">{ship.manufacturer}</span></p>
              <p>Hyperdrive: <span className="text-sw-yellow/80 p-1 bg-sw-yellow/10 rounded">{ship.hyperdrive_rating}</span></p>
              <p>Cost: <span className="text-sw-yellow/80">{ship.cost_in_credits} credits</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12 bg-black/40 p-4 border border-sw-yellow/10">
        <button 
          disabled={!data?.previous}
          onClick={() => setPage(old => Math.max(1, old - 1))}
          className="border border-sw-yellow px-6 py-2 uppercase hover:bg-sw-yellow hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
        >
          Previous
        </button>
        <span className="text-sw-yellow font-bold">Page {page}</span>
        <button 
          disabled={!data?.next}
          onClick={() => setPage(old => old + 1)}
          className="border border-sw-yellow px-6 py-2 uppercase hover:bg-sw-yellow hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  )
}
