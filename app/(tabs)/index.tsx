import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
    const router = useRouter();
    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies);

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "" }));

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image
                    source={icons.logo}
                    className="w-12 h-10 mt-20 mb-5 mx-auto"
                ></Image>
                {moviesLoading || trendingLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#fff"
                        className="mt-10 self-center"
                    />
                ) : moviesError || trendingError ? (
                    <Text className="text-white text-center mt-10">
                        {moviesError?.message || trendingError?.message}
                    </Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a movie"
                        />
                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-white text-lg font-bold mb-3">
                                    Trending Movies
                                </Text>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => (
                                        <View className="w-4" />
                                    )}
                                    data={trendingMovies}
                                    renderItem={({ item, index }) => (
                                        <Text className="text-white text-sm">
                                            <TrendingCard
                                                movie={item}
                                                index={index}
                                            />
                                        </Text>
                                    )}
                                    className="mb-4 mt-3"
                                    keyExtractor={(item) =>
                                        item.movie_id.toString()
                                    }
                                />
                            </View>
                        )}
                        <>
                            <Text className="text-white text-lg font-bold mt-5 mb-3">
                                Latest Movies
                            </Text>
                            <FlatList
                                data={movies}
                                renderItem={({ item }) => (
                                    <MovieCard {...item} />
                                )}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "flex-start",
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10,
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
