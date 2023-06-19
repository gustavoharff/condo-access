import { HomeScreen } from "../screens/home";
import { AccessesScreen } from "../screens/accesses";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Logo } from "../components/logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CarsScreen } from "../screens/cars";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCar from "../screens/add-car";

const Tab = createBottomTabNavigator();

const CarStack = createNativeStackNavigator();

function CarRoutes() {
  return (
    <CarStack.Navigator screenOptions={{ headerShown: false }}>
      <CarStack.Screen name="cars" component={CarsScreen} />
      <CarStack.Screen
        name="add-car"
        component={AddCar}
        options={{
          headerTitle: "Adicionar veículo",
          headerShown: true,
          presentation: "modal",
          headerStyle: {
            backgroundColor: "#1E2225",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </CarStack.Navigator>
  );
}

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: () => <Logo size={24} />,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1E2225",
        },
        headerStyle: {
          backgroundColor: "#1E2225",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="boom-gate-arrow-up"
              size={size}
              color={color}
            />
          ),
        })}
      />

      <Tab.Screen
        name="accesses"
        component={AccessesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"car-clock"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="cars"
        component={CarRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={"car"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
