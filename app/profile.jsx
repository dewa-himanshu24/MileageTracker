import React from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../styles/index.js";
import { icons } from "../constants/index.js";
import MtButton from "../components/common/MtButton.jsx";
import { UserServices, clearAsyncStorage } from "../services/index.js";
import useStore from "../store/index.js";

const Profile = ({}) => {
  const { user, setUsers, setUser, setRefuellings, setVehicle } = useStore();

  const handleLogout = async () => {
    await UserServices.logout();
    setRefuellings([]);
    router.push("/");
  }

  const handleDeleteAccount = async () => {
    const updatedUsers = await UserServices.deleteAccount(user?.user_id);
    console.log("Dewa Profile updatedUsers", updatedUsers);
    // clearAsyncStorage();
    setUsers(null);
    setUser(null);
    setVehicle(null);
    setRefuellings(null);
    router.push("/");
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainerWrapper}>
        <View style={styles.innerContainer}>
          <View style={styles.topBar}>
            <View style={styles.topLeft}>
              <Image source={icons.user} style={styles.user} />
            </View>
            <View style={styles.userInfoSection}>
              <Text style={styles.userName}>{user?.nickname?.toProperCase() || user?.userName?.toProperCase()}</Text>
            </View>
          </View>

          <View style={styles.middleBar}>
            <View style={styles.menuSettingWrapper}>
              <TouchableOpacity
                label="Switch Profile"
                style={styles.menuSettingSwitchButton}
                onPress={() => {
                  router.push("/");
                }}
              >
                <View style={styles.menuSetting}>
                  <View style={styles.menuSettingLeft}>
                    <Image source={icons.user} style={styles.menuSettingIcon} />
                    <Text style={styles.menuSettingText}>Switch Profile</Text>
                  </View>
                  <Image
                    source={icons.rightSmallArrow}
                    style={styles.rightSmallArrow}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                label="Delete Account"
                style={styles.menuSettingDeleteButton}
                onPress={handleDeleteAccount}
              >
                <View style={styles.menuSetting}>
                  <View style={styles.menuSettingLeft}>
                    <Image
                      source={icons.delete}
                      style={styles.menuSettingIcon}
                    />
                    <Text style={styles.menuSettingText}>Delete Account</Text>
                  </View>
                  <Image
                    source={icons.rightSmallArrow}
                    style={styles.rightSmallArrow}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.menuLogout}>
              <MtButton
                title="Logout"
                textColor={Colors.white}
                backgroundColor={Colors.error}
                width="100%"
                onPress={() => {
                  handleLogout();
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.footerBar}>
          <Text style={styles.versionText}>Current Version: 1.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000010",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    left: 0,
    zIndex: 1000,
  },
  innerContainerWrapper: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    width: "80%",
    height: "100%",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
  },
  topBar: {
    marginTop: 36,
    width: "100%",
    height: 82,
    marginBottom: 20,
    paddingVertical: 0,
  },
  topLeft: {
    width: 110,
    height: 24,
  },
  user: {
    width: 24,
    height: 24,
  },
  userInfoSection: {
    flexDirection: "column",
    marginTop: 12,
  },
  userName: {
    fontFamily: "Rubrik-Medium",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 25,
  },
  middleBar: {
    // marginBottom: 40,
  },
  menuSettingWrapper: {
    height: 104,
    // padding: 16,
    borderRadius: 8,
    marginBottom: 420,
    backgroundColor: Colors.white,
  },
  menuSetting: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuSettingLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  menuSettingText: {
    fontFamily: "Rubrik-Regular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 0.15,
    marginLeft: 8,
  },
  menuSettingButton: {
    padding: 16,
  },
  menuSettingSwitchButton: {
    padding: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(206, 216, 222, 1)",
  },
  menuSettingDeleteButton: {
    padding: 16,
    paddingTop: 8,
  },
  menuSettingIcon: {
    width: 24,
    height: 24,
  },
  rightSmallArrow: {
    width: 12,
    height: 12,
  },
  switchProfileText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuLogout: {
    width: "100%",
  },
  footerBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 41,
    backgroundColor: "rgba(88, 121, 140, 1)",
  },
  versionText: {
    fontFamily: "Rubrik-Regular",
    fontSize: 12,
    fontWeight: "400",
    color: Colors.white,
    lineHeight: 17,
  },
});

export default Profile;
