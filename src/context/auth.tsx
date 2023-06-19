// import { useRouter, useSegments } from "expo-router";
import React, { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from "../lib/api";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";


import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextData {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
// function useProtectedRoute(user: User | null) {
//   const segments = useSegments();
//   const router = useRouter();

//   React.useEffect(() => {
//     const inAuthGroup = segments[0] === "(auth)";

//     if (
//       // If the user is not signed in and the initial segment is not anything in the auth group.
//       !user &&
//       !inAuthGroup
//     ) {
//       // Redirect to the sign-in page.
//       router.replace("/");
//     } else if (user && inAuthGroup) {
//       // Redirect away from the sign-in page.
//       router.replace("/home");
//     }
//   }, [user, segments]);
// }

export function AuthProvider(props: PropsWithChildren) {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });




  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  // useProtectedRoute(user);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await client.post("/auth", {
      email,
      password,
    });

    client.defaults.headers.authorization = `Bearer ${response.data.token}`;
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

    setUser(response.data.user);
  }, []);

  const signOut = useCallback(() => {
    delete client.defaults.headers.authorization;

    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');

    setUser(null);
  }, []);

  useEffect(() => {
    (async () => {
      const storagedToken = await AsyncStorage.getItem('token');
      const storagedUser = await AsyncStorage.getItem('user');

      if (storagedToken && storagedUser) {
        client.defaults.headers.authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }

      setLoading(false)
    })();
  }, [])

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded])

  if (!loaded || loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
