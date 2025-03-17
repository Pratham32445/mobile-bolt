    import { Stack } from 'expo-router';
    import { StatusBar } from 'react-native';

    const Layout = () => {
      return (
        <>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="watch" />
          </Stack>
        </>
      );
    };

    export default Layout;