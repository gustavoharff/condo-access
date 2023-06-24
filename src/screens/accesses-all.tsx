import { ScrollView, Text, View } from "react-native";
import { Header } from "../../src/components/header";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Access } from "../lib/realm";
import { RealmContext } from "../context/realm";

export function AccessesAllScreen() {
  const [accesses, setAccesses] = useState<Access[]>([]);

  const { realm } = useContext(RealmContext);

  useEffect(() => {
    if (!realm) {
      return;
    }

    const objects = realm.objects<Access>("Access");

    objects.addListener((collection) => {
      setAccesses(collection.toJSON() as Access[]);
    });

    return () => {
      objects.removeAllListeners();
    };
  }, [realm]);

  return (
    <View className="flex flex-col flex-1 bg-[#212529]">
      <Header className="m-4">
        <Header.Title>Todos os acessos</Header.Title>
        <Header.Description>
          Consulte aqui todos os acessos dos moradores do condomínio.
        </Header.Description>
      </Header>

      <View className="px-4 flex-row justify-between mx-2 mb-2">
        <Text className="font-poppins-400 text-gray-400">Placa</Text>

        <Text className="font-poppins-400 text-gray-400">Data</Text>
      </View>

      <ScrollView className="px-4 gap-2">
        {accesses.map((item) => (
          <View
            key={item.id}
            className="border border-solid border-gray-600 p-3 rounded-lg flex-row justify-between bg-[#1E2225]"
          >
            <Text className="font-poppins-400 text-white">
              {item.car.plate}
            </Text>

            <Text className="font-poppins-400 text-white">
              {dayjs(item.date).format("DD/MM/YYYY HH:mm")}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
