import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants/index.js';
import { Colors } from '../../styles/index.js';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
      <Text
        style={[
          styles.text,
          focused ? styles.focusedText : styles.inactiveText,
          { color: color },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.disabled,
          height: 68,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? icons.homeFilled : icons.homeOutlined}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="refuelling"
        options={{
          title: 'Refuelling',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? icons.refuellingFilled : icons.refuellingOutlined}
              color={color}
              name="Refuelling"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="performance"
        options={{
          title: 'Performance',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? icons.performanceFilled : icons.performanceOutlined}
              color={color}
              name="Performance"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicles"
        options={{
          title: 'Vehicles',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={focused ? icons.vehiclesFilled : icons.vehiclesOutlined}
              color={color}
              name="Vehicles"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
  },
  focusedText: {
    fontFamily: 'Rubik-SemiBold',
  },
  inactiveText: {
    fontFamily: 'Rubik-Regular',
  },
});

export default TabsLayout;
