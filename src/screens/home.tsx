import { ScrollView, Text, View } from "react-native";
import { Header } from "../../src/components/header";
import ButtonCircular from "../../src/components/circular-button";
import { Access } from "../../src/models/access.entity";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { client } from "../../src/lib/api";

export function HomeScreen() {
  const [accesses, setAccesses] = useState<Access[]>([]);

  useEffect(() => {
    client.get("/accesses").then((response) => {
      setAccesses(response.data);
    });
  }, []);

  async function onRelease() {
    const response = await client.post("/accesses", {
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });

    setAccesses([...accesses, response.data]);
  }

  return (
    <View className="flex flex-col flex-1 bg-[#212529]">
      <Header className="m-4">
        <Header.Title>Abrir portão</Header.Title>
        <Header.Description>
          Fique pressionando o botão abaixo para realizar a abertura do portão.
        </Header.Description>
      </Header>

      <ScrollView className="px-4 gap-2">
        {accesses.map((item) => (
          <View
            key={item.id}
            className="border border-solid border-gray-600 p-3 rounded-lg flex-row justify-between bg-[#1E2225]"
          >
            <Text className="font-poppins-400 text-white">
              {/* {item} */}
            </Text>

            <Text className="font-poppins-400 text-white">
              {dayjs(item.date).format("DD/MM/YYYY HH:mm")}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="mt-auto items-center my-4">
        {/* @ts-ignore */}
        <ButtonCircular onRelease={onRelease} />
      </View>
    </View>
  );
}
