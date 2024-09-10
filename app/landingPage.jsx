import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { images } from "../constants/index.js";
import MTButton from "../components/common/MtButton.jsx";
import { Colors } from "../styles/index.js";
import MtButton from "../components/common/MtButton.jsx";
import useStore from "../store/index.js";
import '../utils/prototypes.js';
import { UserServices } from "../services/index.js";


const LandingPage = ({ users }) => {
  const { setUser } = useStore();

  const [hasUsers, setHasUsers] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const profiles = Object.values(users);
    if (profiles.length < 6) {
      profiles.push({ id: "add", nickname: "Add User", isAddUserButton: true });
    }
    setUserProfiles(profiles);
    setHasUsers(Object.values(users).length > 0);
  }, [users]);

  const handleAddUser = () => {
    router.push("/sign-up");
  }

  const handleProfileSelection = async (profileId) => {
    const selectedProfile = await UserServices.getUserById(profileId);
    // Set usr in Store
    if (selectedProfile?.passcode) {
      router.push("/sign-in");
    } else {
      // await UserServices.setLoggedInUser(selectedProfile);
      router.push("/home");
    }
    setUser(selectedProfile);
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={[styles.topContainer, { marginBottom: hasUsers ? 200 : 40 }]}
        >
          {/* Top Logo */}
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.title}>Mileage Tracker</Text>
        </View>

        {/* If no account is created in the app */}
        {!hasUsers && (
          <View style={styles.noAccountContainer}>
            <Text style={styles.subtitle}>
              Create an account to get started
            </Text>
            <View style={styles.buttonContainer}>
              <MTButton
                title="Sign up"
                textColor={Colors.textSecondary}
                onPress={() => {
                  router.push("/sign-up");
                  // router.push("/home");
                }}
              />
            </View>

            <View style={styles.illustrationContainer}>
              {/* Bottom Image */}
              <Image source={images.illustration} style={styles.bottomImage} />
              <Text style={styles.footerText}>
                Track your miles towards a prosperous financial journey!
              </Text>
            </View>
          </View>
        )}

        {/* If at least one account is created in the app */}
        {hasUsers && (
          <View style={styles.accountsContainer}>
            {/* Profile Selection Section */}
            <Text style={styles.subtitle}>Who are you?</Text>
            <FlatList
              data={userProfiles}
              keyExtractor={(item) => item.user_id}
              renderItem={({ item }) =>
                item.isAddUserButton ? (
                  <TouchableOpacity style={styles.profileContainer}>
                    <MtButton
                      textColor={Colors.textSecondary}
                      iconName="plus"
                      iconSize={24}
                      iconColor={Colors.textSecondary}
                      width={52}
                      height={52}
                      borderRadius={28}
                      iconMarginLeft={0}
                      onPress={handleAddUser}
                    />
                    <Text style={styles.profileName}>{item?.nickname || item?.userName}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.profileContainer}
                    onPress={() => handleProfileSelection(item?.user_id)}
                  >
                    <View style={styles.defaultProfile}>
                      <Text style={styles.initial}>{item?.nickname?.toUpperCase()?.charAt(0) || item?.userName?.toUpperCase()?.charAt(0)}</Text>
                    </View>
                    <Text
                      style={styles.profileName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item?.nickname?.toProperCase() || item?.userName?.toProperCase()}
                    </Text>
                  </TouchableOpacity>
                )
              }
              numColumns={3}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Rubrik-Medium",
    lineHeight: 25,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    height: "100%",
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 149,
    height: 149,
    marginTop: 52,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Rubrik-Medium",
    fontSize: 20,
    fontWeight: "500",
    color: "#FF4C4C",
  },
  subtitle: {
    fontFamily: "Rubrik-Regular",
    fontSize: 20,
    fontWeight: "400",
    color: Colors.textPrimary,
    marginBottom: 32,
    lineHeight: 25,
    justifyContent: "center",
  },
  buttonContainer: {
    marginBottom: 61,
  },
  noAccountContainer: {
    width: "100%",
    alignItems: "center",
  },
  illustrationContainer: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  footerText: {
    position: "absolute",
    width: 307,
    top: 234,
    fontFamily: "Rubrik-Regular",
    fontSize: 22,
    lineHeight: 27.98,
    color: Colors.textPrimary,
    textAlign: "center",
    fontWeight: "400",
    alignSelf: "center",
  },
  accountsContainer: {
    width: "100%",
    alignItems: "center",
    height: 239,
    width: 324,
  },
  flatListContent: {
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  profileContainer: {
    alignItems: "center",
    width: 72,
    height: 77,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 30,
    marginBottom: 10,
  },
  defaultProfile: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: "rgba(241, 132, 132, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    fontFamily: "Rubrik-Regular",
    color: Colors.white,
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 28,
  },
  profileName: {
    fontFamily: "Rubrik-Regular",
    fontWeight: "400",
    fontSize: 12,
    marginTop: 10,
    lineHeight: 17,
  },
  addUserContainer: {
    alignItems: "center",
    width: 72,
    height: 77,
  },
});

export default LandingPage;
