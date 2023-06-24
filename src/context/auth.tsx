// import { useRouter, useSegments } from "expo-router";
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../lib/api";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";


import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { RealmContext } from "./realm";
import { Session, User } from "../lib/realm";

interface AuthContextData {
  user: User | null;
  signOut: () => void;
}

export const AuthContext = React.createContext<AuthContextData>(
  {} as AuthContextData
);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider(props: PropsWithChildren) {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { realm } = useContext(RealmContext);

  const [user, setUser] = React.useState<User | null>(null);

  const signOut = useCallback(() => {
    realm?.write(() => {
      realm.deleteModel("Session");
    });

    setUser(null);
  }, [realm]);

  useEffect(() => {
    if (!realm) {
      return;
    }

    const objects = realm.objects<Session>("Session");

    objects.addListener((collection) => {
      if (collection.length === 0) {
        setUser(null);
        return;
      }

      setUser(collection[0].user);
    });

    return () => {
      objects.removeAllListeners();
    };
  }, [realm]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
