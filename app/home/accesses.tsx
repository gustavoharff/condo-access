import { ScrollView, Text, View } from "react-native";
import { Header } from "../../src/components/header";
import { Access } from "../../src/models/access.entity";
import dayjs from "dayjs";

export default function Accesses() {
  const items: Access[] = [
    {
      id: "1",
      date: new Date(),
      car: {
        id: "1",
        plate: "ABC-1234",
      },
    },
    {
      id: "2",
      date: new Date(),
      car: {
        id: "2",
        plate: "ABC-1234",
      },
    },
  ];

  return (
    <View className="flex flex-col flex-1">
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
        {items.map((item) => (
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
