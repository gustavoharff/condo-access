import { useRouter, useSegments } from "expo-router";
import React, { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from "../lib/api";

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

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/home");
    }
  }, [user, segments]);
}

export function Provider(props: PropsWithChildren) {
  const [user, setAuth] = React.useState<User | null>(null);

  useProtectedRoute(user);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await client.post("/auth", {
      email,
      password,
    });

    client.defaults.headers.authorization = `Bearer ${response.data.token}`;
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

    setAuth(response.data.user);
  }, []);

  const signOut = useCallback(() => {
    delete client.defaults.headers.authorization;

    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');

    setAuth(null);
  }, []);

  useEffect(() => {
    (async () => {
      const storagedToken = await AsyncStorage.getItem('token');
      const storagedUser = await AsyncStorage.getItem('user');

      console.log(storagedToken)

      if (storagedToken && storagedUser) {
        client.defaults.headers.authorization = `Bearer ${storagedToken}`;
        setAuth(JSON.parse(storagedUser));
      }
    })();
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
