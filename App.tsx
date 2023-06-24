import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/navigation";
import { AuthContext, AuthProvider } from "./src/context/auth";
import { AuthRoutes } from "./src/navigation/auth-routes";
import * as SplashScreen from "expo-splash-screen";
import { RealmProvider } from "./src/context/realm";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <RealmProvider>
      <StatusBar style="light"/>
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) =>
            value.user ? (
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            ) : (
              <NavigationContainer>
                <AuthRoutes />
              </NavigationContainer>
            )
          }
        </AuthContext.Consumer>
      </AuthProvider>
    </RealmProvider>
  );
}
