import { ScrollView, Text, View } from "react-native";
import { Header } from "../../src/components/header";
import ButtonCircular from "../../src/components/circular-button";
import { Access } from "../../src/models/access.entity";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { client } from "../../src/lib/api";
import { Picker } from "@react-native-picker/picker";
import { Car } from "../models/car.entity";
import { useFocusEffect } from "@react-navigation/native";

export function HomeScreen() {
  const [accesses, setAccesses] = useState<Access[]>([]);

  const [carId, setCarId] = useState<string | null>(null);

  const [cars, setCars] = useState<Car[]>([]);

  useFocusEffect(
    useCallback(() => {
      client.get("/accesses").then((response) => {
        setAccesses(response.data);
      });

      client.get("/cars").then((response) => {
        setCars(response.data);
      });
    }, [])
  );

  async function onRelease() {
    if (!carId) {
      return;
    }

    const response = await client.post("/accesses", {
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      carId: carId,
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

      <Picker
        itemStyle={{
          color: "white",
        }}
        selectedValue={carId}
        onValueChange={(itemValue, itemIndex) => setCarId(itemValue)}
      >
        {cars.map((item) => (
          <Picker.Item key={item.id} label={item.plate} value={item.id} />
        ))}
      </Picker>

      <View className="mt-auto items-center my-auto">
        {/* @ts-ignore */}
        <ButtonCircular onRelease={onRelease} />
      </View>
    </View>
  );
}
