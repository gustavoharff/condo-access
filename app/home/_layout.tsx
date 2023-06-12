import { Tabs } from "expo-router";
import { Provider } from "../../src/context/auth";
import { Logo } from "../../src/components/logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { red } from "tailwindcss/colors";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Root() {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "transparent",
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1E2225",
        },
        tabBarActiveTintColor: red[500],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="boom-gate-arrow-up"
              size={size}
              color={color}
            />
          ),
          headerTitle: () => <Logo size={28} />,
          headerStyle: {
            backgroundColor: "#1E2225",
          },
          href: "/home",
        }}
      />

      <Tabs.Screen
        name="accesses"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"car-clock"}
              size={size}
              color={color}
            />
          ),
          headerTitle: () => <Logo size={28} />,
          headerStyle: {
            backgroundColor: "#1E2225",
          },
          href: "/home/accesses",
        }}
      />

      <Tabs.Screen
        name="cars"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={"car"} size={size} color={color} />
          ),
          headerTitle: () => <Logo size={28} />,
          headerStyle: {
            backgroundColor: "#1E2225",
          },
          href: "/home/cars",
        }}
      />
    </Tabs>
  );
}
