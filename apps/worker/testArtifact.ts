export const testArtifact = `xml
<boltArtifact id="youtube-app" title="YouTube-like Application in React Native">
  <boltAction type="file" filePath="package.json">
{
  "name": "youtube-app",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest --watchAll",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "dev": "expo start --port 8081"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-native-async-storage/async-storage": "1.23.1",
    "@react-navigation/bottom-tabs": "^6.5.16",
    "@react-navigation/native": "^6.1.14",
    "@reduxjs/toolkit": "^2.2.1",
    "axios": "^1.6.7",
    "expo": "~52.0.7",
    "expo-av": "~13.6.0",
    "expo-constants": "~16.0.12",
    "expo-linking": "~7.0.10",
    "expo-router": "^3.4.8",
    "expo-splash-screen": "~0.22.0",
    "expo-status-bar": "~1.6.0",
    "moment": "^2.30.1",
    "react": "18.2.0",
    "react-native": "0.73.6",
    "react-native-dotenv": "^3.4.10",
    "react-native-gesture-handler": "~2.14.0",
    "react-native-pager-view": "5.4.24",
    "react-native-paper": "5.17.6",
    "react-native-reanimated": "~3.6.2",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    "react-native-tab-view": "^3.5.2",
    "react-native-url-polyfill": "^2.0.0",
    "react-native-vector-icons": "^10.0.3",
    "react-native-webview": "13.6.4",
    "react-redux": "^9.1.0",
    "redux-persist": "^6.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.45",
    "@types/react-native": "~0.73.0",
    "@typescript-eslint/eslint-plugin": "^7.1.0",
    "@typescript-eslint/parser": "^7.1.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "jest": "^29.2.1",
    "jest-expo": "~52.0.0",
    "prettier": "^3.2.5",
    "react-native-dotenv": "^3.4.10",
    "react-test-renderer": "18.2.0",
    "typescript": "^5.1.3"
  },
  "resolutions": {
    "metro": "^0.76.0",
    "metro-resolver": "^0.76.0"
  },
  "overrides": {
    "react-refresh": "~0.14.0"
  },
  "private": true
}
</boltAction>
  <boltAction type="shell">
npm install --legacy-peer-deps
  </boltAction>
  <boltAction type="file" filePath="app/_layout.tsx">
import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

const RootLayout = () => {  
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
</boltAction>
  <boltAction type="file" filePath="app/(tabs)/_layout.tsx">
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarItemStyle: {
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          tabBarLabel: 'Trending',
          tabBarIcon: ({ color }) => <Icon name="trending-up" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          tabBarLabel: 'Subscriptions',
          tabBarIcon: ({ color }) => <Icon name="subscriptions" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => <Icon name="video-library" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
</boltAction>
  <boltAction type="file" filePath="app/(tabs)/home.tsx">
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchVideos } from '../../store/videosSlice';
import VideoCard from '../../components/VideoCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state: any) => state.videos.videos);
  const status = useSelector((state: any) => state.videos.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <View>Loading videos...</View>;
  }

  if (status === 'failed') {
    return <View>Error loading videos.</View>;
  }

  return (
    <ScrollView style={styles.container}>
      {videos.map((video: any) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default HomeScreen;
</boltAction>
  <boltAction type="file" filePath="app/(tabs)/trending.tsx">
import React from 'react';
import { View, Text } from 'react-native';

const TrendingScreen = () => {
  return (
    <View>
      <Text>Trending Videos</Text>
    </View>
  );
};

export default TrendingScreen;
</boltAction>
  <boltAction type="file" filePath="app/(tabs)/subscriptions.tsx">
import React from 'react';
import { View, Text } from 'react-native';

const SubscriptionsScreen = () => {
  return (
    <View>
      <Text>Subscriptions</Text>
    </View>
  );
};

export default SubscriptionsScreen;
</boltAction>
  <boltAction type="file" filePath="app/(tabs)/library.tsx">
import React from 'react';
import { View, Text } from 'react-native';

const LibraryScreen = () => {
  return (
    <View>
      <Text>Library</Text>
    </View>
  );
};

export default LibraryScreen;
</boltAction>
  <boltAction type="file" filePath="components/VideoCard.tsx">
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  uploadedAt: string;
}

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      <View style={styles.videoDetails}>
        <Image source={{ uri: video.channelAvatar }} style={styles.channelAvatar} />
        <View style={styles.videoInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.channelName}>{video.channelName}</Text>
          <Text style={styles.metadata}>
            {video.views.toLocaleString()} views - {moment(video.uploadedAt).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  videoDetails: {
    flexDirection: 'row',
    padding: 10,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  videoInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  channelName: {
    fontSize: 14,
    color: '#666',
  },
  metadata: {
    fontSize: 12,
    color: '#777',
  },
});

export default VideoCard;
</boltAction>
  <boltAction type="file" filePath="constants/apiKeys.ts">
export const API_KEY = 'YOUR_YOUTUBE_API_KEY';
</boltAction>
  <boltAction type="file" filePath="store/index.ts">
import { configureStore } from '@reduxjs/toolkit';

import videosReducer from './videosSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
  },
});
</boltAction>
  <boltAction type="file" filePath="store/videosSlice.ts">
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  videos: [],
  status: 'idle',
  error: null,
};

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
  const response = await axios.get('https://myfakeapi.com/api/youtube-videos');
  return response.data;
});

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default videosSlice.reducer;
</boltAction>
  <boltAction type="shell">
npx expo start
  </boltAction>
</boltArtifact>
`