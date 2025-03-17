import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import axios from "axios";

const API_KEY = "YOUR_YOUTUBE_API_KEY"; // Replace with your YouTube API key
const CHANNEL_ID = "UC_x5XG1OV2P6uZZ5FSM9Ttw"; // Replace with a YouTube channel ID

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

const VideoCard = ({ video }: { video: VideoItem }) => (
  <Link href={`/watch?videoId=${video.id}`} asChild>
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.channelTitle}>{video.channelTitle}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

export default function Home() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`
        );

        const videoItems = response.data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channelTitle: item.snippet.channelTitle,
        }));

        setVideos(videoItems);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  thumbnail: {
    width: 100,
    height: 60,
    borderRadius: 3,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  channelTitle: {
    fontSize: 14,
    color: "gray",
  },
});
