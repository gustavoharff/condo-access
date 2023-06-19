import { ScrollView, Text, View } from "react-native";
import { ActionButton } from "../../src/components/action-button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Car } from "../../src/models/car.entity";
import { client } from "../../src/lib/api";
import { Header } from "../../src/components/header";

export function CarsScreen() {
  const navigation = useNavigation();

  const [cars, setCars] = useState<Car[]>([]);

  console.log(cars)

  const load = useCallback(async () => {
    const response = await client.get("/cars");

    setCars(response.data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  function onAddPress() {
    // @ts-ignore
    navigation.navigate("add-car");
  }

  return (
    <View className="flex-1 relative bg-[#212529]">
      <Header className="m-4">
        <Header.Title>Acessos</Header.Title>
        <Header.Description>
          Consulte aqui todos os seus acessos no condomínio.
        </Header.Description>
      </Header>

      <ScrollView className="px-4 gap-2">
        {cars.map((car) => (
          <View
            key={car.id}
            className="border border-solid border-gray-600 p-3 rounded-lg flex-row justify-between bg-[#1E2225]"
          >
            <Text className="font-poppins-400 text-white">{car.plate}</Text>
          </View>
        ))}
      </ScrollView>
      <ActionButton onPress={onAddPress} />
    </View>
  );
}
