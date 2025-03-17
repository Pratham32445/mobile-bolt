    import React, { useState, useEffect } from 'react';
    import {
      StyleSheet,
      View,
      Text,
      ActivityIndicator,
      Dimensions
    } from 'react-native';
    import { useSearchParams } from 'expo-router';
    import { Video } from 'expo-av';

    const { width, height } = Dimensions.get('window');

    const WatchScreen = () => {
      const { videoId } = useSearchParams();
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        if (videoId) {
          setIsLoading(false);
        }
      }, [videoId]);

      if (isLoading || !videoId) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading video...</Text>
          </View>
        );
      }

      const youtubeVideoURL = `https://www.youtube.com/embed/${videoId}`;

      return (
        <View style={styles.container}>
          <Video
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            style={styles.video}
            resizeMode="contain"
            isLooping
            shouldPlay
            useNativeControls
          />
          <Text>Video ID: {videoId}</Text>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      video: {
        width: width,
        height: height / 3,
      },
    });

    export default WatchScreen;