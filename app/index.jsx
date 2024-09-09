import React, { useEffect, useState } from "react";
import { View, AppState, Pressable, Text } from "react-native";
import LandingPage from "./landingPage";
import ErrorScreen from "../components/common/ErrorScreen";
import { UserServices, clearAsyncStorage } from "../services/index.js";
import useStore from "../store/index.js";
import { router } from "expo-router";

const App = () => {
  const { user, setUser, setVehicle, setRefuellings } = useStore();
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      // clearAsyncStorage();
      try {
        // Fetch all users and the logged-in user
        const users = await UserServices.getAllUsers();
        const loggedInUser = await UserServices.getLoggedInUser();

        if (loggedInUser && loggedInUser?.user_id) {
          // Fetch the specific user details based on the logged-in user's ID
          const selectedUser = await UserServices.getUserById(
            loggedInUser?.user_id
          );
          // Set user in Store
          setUser(selectedUser);
          setVehicle(Object.values(selectedUser?.vehicles)?.[0] || null);
          setRefuellings(
            Object.values(selectedUser?.vehicles)?.[0]?.refuellings
          );
          // Route to the correct page based on whether the user has a passcode
          if (loggedInUser?.passcode) {
            router.push("/sign-in");
          } else {
            router.push("/home");
          }
          // router.push("/home");
        }
        // Set the list of users
        setUsers(users);
      } catch (err) {
        console.error("Error fetching users or logged-in user:", err);
        setError("Failed to load user data");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Listen to AppState changes
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        // App is going to background, save user data to Users Storage
        const newUser = user.hasOwnProperty("user_id") ? user : null;
        await UserServices.saveUserToStorageUsers(newUser);
      }
    };

    // Add AppState listener
    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateListener.remove();
    };
  }, [user]);

  // Render the error screen if there was an issue fetching data
  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <View>
      <Pressable
        onPress={() => {
          console.log("Clearing storage");
          setUser(null);
          clearAsyncStorage();
        }}
        style={{ marginTop: 15 }}
      >
        <Text>Clear Storage</Text>
      </Pressable>
      <LandingPage users={users} />
    </View>
  );
};

export default App;
