import useSWR from 'swr';

// Your GitHub username and repo
const repoOwner = 'RoKoDerBoss';
const repoName = 'kandoran_website';
const branch = 'main';

export function useCharacters() {
  const { data, error, isLoading } = useSWR(
    `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/data/characters.json`,
    url => fetch(url).then(res => {
      if (!res.ok) throw new Error('Failed to fetch characters');
      return res.json();
    }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60 * 60 * 1000, // Cache for 1 hour
    }
  );
  
  return {
    characters: data,
    isLoading,
    error
  };
} 