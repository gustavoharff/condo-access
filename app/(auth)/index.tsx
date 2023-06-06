import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Input } from "../../src/components/input";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Logo } from "../../src/components/logo";
import { Button } from "../../src/components/button";
import { useState } from "react";
import { useAuth } from "../../src/context/auth";

export default function Login() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  async function onSubmit() {
    await signIn(email, password);

    router.push("/home");
  }

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View className="flex flex-1 items-center justify-center">
      <Logo size={120} />

      <Text className="font-poppins-700 text-white text-2xl">CONDO ACCESS</Text>

      <Input
        placeholder="E-mail"
        className="w-11/12 m-4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        className="w-11/12 m-4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button className="w-11/12 m-4" onPress={onSubmit}>
        Entrar
      </Button>
    </View>
  );
}
