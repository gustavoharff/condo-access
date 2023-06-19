import { Text, TouchableOpacity, View } from "react-native";

import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { client } from "../lib/api";
import { Header } from "../components/header";
import { Input } from "../components/input";

export default function AddCar() {
  const navigation = useNavigation();

  const [plate, setPlate] = useState("");

  const onSubmit = useCallback(async ()  => {
    await client.post("/cars", {
      plate: plate,
    });

    navigation.goBack();
  }, [plate])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSubmit}>
          <Text className="font-poppins-700 text-red-500 text-sm">Salvar</Text>
        </TouchableOpacity>
      ),
    });
  }, [onSubmit]);

  return (
    <View className="flex-1 bg-[#212529]">
      <Header className="m-4">
        <Header.Description>
          Informe os dados do veículo abaixo.
        </Header.Description>
      </Header>

      <View className="px-4">
        <Input
          placeholder="Placa do veículo"
          returnKeyType="send"
          onSubmitEditing={onSubmit}
          value={plate}
          maxLength={7}
          onChangeText={(value) => setPlate(value.toUpperCase())}
        />
      </View>
    </View>
  );
}
