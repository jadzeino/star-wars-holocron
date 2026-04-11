export const BASE_URL = 'https://swapi.py4e.com/api';

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

// Adding generic fetcher to handle characters and planets with pagination
export async function fetchResource(resourceType: string, page: number = 1) {
  const url = `${BASE_URL}/${resourceType}/?page=${page}`;
  // console.log("fetching resource:", url);
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${resourceType} from SWAPI`);
  }
  
  return res.json();
}
