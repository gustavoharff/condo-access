import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Input } from "../../src/components/input";
import { Logo } from "../../src/components/logo";
import { Button } from "../../src/components/button";
import {  useState } from "react";
import { useAuth } from "../../src/context/auth";

export function AuthScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  async function onSubmit() {
    await signIn(email, password);

    // @ts-ignore
    navigation.navigate("/home");
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
