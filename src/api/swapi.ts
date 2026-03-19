export const BASE_URL = 'https://swapi.dev/api';

// fetching films logic
export async function fetchFilms() {
  console.log("fetching films from", BASE_URL + '/films');
  const res = await fetch(`${BASE_URL}/films`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  
  // just return the results array for now
  return data.results;
}

// NOTE: added today to get deep link working
export async function fetchFilmById(id: string) {
  const res = await fetch(`${BASE_URL}/films/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch film from SWAPI');
  }
  return res.json();
}
