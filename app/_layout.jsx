import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Rubrik-Medium": require("../assets/fonts/Rubrik_Medium.ttf"),
    "Rubrik-Regular": require("../assets/fonts/Rubrik_Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="addVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="VehicleList" options={{ headerShown: false }} />
      <Stack.Screen name="viewRefuelling" options={{ headerShown: false }} />
      <Stack.Screen name="formRefuelling" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
