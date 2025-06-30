export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
};

export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const res = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    if (!res.ok) {
        // @ts-ignore
        throw new Error("Failed to fetch movies", res.statusText);
    }

    const data = await res.json();
    return data.results;
};

// const url = "https://api.themoviedb.org/3/authentication";
// const options = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//         Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTIxODMxNDEwM2ZlZjk0ZTE1ZjFlMzc4MWUxNzRhYSIsIm5iZiI6MTc1MTI4MDg5Ny40ODE5OTk5LCJzdWIiOiI2ODYyNmQwMWRhN2ExZDhjYmEyMjlhMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qZGf57YrcN7uwqNeW-36FwnHZbncn10XnhjA-ESW4_s",
//     },
// };

// fetch(url, options)
//     .then((res) => res.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.error(err));
