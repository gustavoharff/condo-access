import { Link } from "expo-router";
import { Button, Text, View } from "react-native";
import { Input } from "../src/components/input";
import { useFonts, FontDisplay } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { red } from "tailwindcss/colors";

export default function Login() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View className="flex flex-1 items-center justify-center">
      <Link href="/home" className="font-poppins-700 text-white text-2xl">
        CONDO ACCESS
      </Link>

      <Input placeholder="E-mail" className="w-11/12 m-4" />
      <Input placeholder="Senha" className="w-11/12 m-4" />

      <Button title="Entrar" color={red[500]} />
    </View>
  );
}