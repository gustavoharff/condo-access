import { useNavigation } from "@react-navigation/native";
import { Alert, Text, View } from "react-native";
import { Input } from "../../src/components/input";
import { Logo } from "../../src/components/logo";
import { Button } from "../../src/components/button";
import { useContext, useState } from "react";
import { useAuth } from "../../src/context/auth";
import { RealmContext } from "../context/realm";
import { Session, User } from "../lib/realm";
import * as Crypto from "expo-crypto";

export function AuthScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { realm } = useContext(RealmContext);

  async function onSubmit() {
    const user = realm
      ?.objects<User>("User")
      .filtered("email = $0 and password = $1", email, password)[0];

    if (!user) {
      Alert.alert("Usuário não encontrado");
      return;
    }

    realm.write(() => {
      realm.create<Session>("Session", {
        id: Crypto.randomUUID(),
        user,
      });
    });
  }

  return (
    <View className="flex flex-1 items-center justify-center bg-[#212529]">
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
