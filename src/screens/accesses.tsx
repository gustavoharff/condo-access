import { ScrollView, Text, View } from "react-native";
import { Header } from "../../src/components/header";
import { Access } from "../../src/models/access.entity";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { client } from "../../src/lib/api";

export function AccessesScreen() {
  const [accesses, setAccesses] = useState<Access[]>([]);

  const load = useCallback(async () => {
    const response = await client.get("/accesses");

    setAccesses(response.data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View className="flex flex-col flex-1 bg-[#212529]">
      <Header className="m-4">
        <Header.Title>Acessos</Header.Title>
        <Header.Description>
          Consulte aqui todos os seus acessos no condomínio.
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