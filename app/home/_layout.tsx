import { Stack, Tabs } from "expo-router";
import { Provider } from "../../src/context/auth";
import { Logo } from "../../src/components/logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { red } from "tailwindcss/colors";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Provider>
      <Tabs
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1E2225",
          },
          tabBarActiveTintColor: red[500]
        }}
      >
        <Tabs.Screen
          name="index"
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
            href: "/home",
          }}
        />

        <Tabs.Screen
          name="cars"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={"car"}
                size={size}
                color={color}
              />
            ),
            headerTitle: () => <Logo size={28} />,
            headerStyle: {
              backgroundColor: "#1E2225",
            },
            href: "/home/cars",
          }}
        />
      </Tabs>
    </Provider>
  );
}
