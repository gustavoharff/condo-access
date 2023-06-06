import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Input } from "../src/components/input";
import { useFonts, FontDisplay } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { red } from "tailwindcss/colors";
import { Logo } from "../src/components/logo";
import { Button } from "../src/components/button";

export default function Login() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const router = useRouter();

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View className="flex flex-1 items-center justify-center">
      <Logo size={120} />

      <Text className="font-poppins-700 text-white text-2xl">CONDO ACCESS</Text>

      <Input placeholder="E-mail" className="w-11/12 m-4" />
      <Input placeholder="Senha" className="w-11/12 m-4" />

      <Button
        className="w-11/12 m-4"
        onPress={() => {
          router.push("/home");
        }}
      >
        Entrar
      </Button>
    </View>
  );
}
