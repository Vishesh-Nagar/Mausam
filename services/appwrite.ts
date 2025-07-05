import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? "";
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID ?? "";

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("searchTerm", query)]
        );

        if (result.documents.length > 0) {
            // console.log("Documents found: ", result.documents);
            const existingMovie = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.searchCount + 1,
                    lastSearchedMovie: movie.id,
                }
            );
        } else {
            // console.log("No documents found, creating a new one.");
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movie_id: movie.id,
                    title: movie.title,
                }
            );
            // console.log("New document created successfully.");
        }
        if (result && result.documents && result.documents.length > 0) {
            return result.documents[0];
        } else {
            return "Document created";
        }
    } catch (error) {
        // console.error("Error updating search count:", error);
        throw error;
    }
};
