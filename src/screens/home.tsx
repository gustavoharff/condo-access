import { ScrollView, Text, View } from "react-native";
import { Header } from "../../src/components/header";
import ButtonCircular from "../../src/components/circular-button";
import dayjs from "dayjs";
import { useCallback, useContext, useEffect, useState } from "react";
import { client } from "../../src/lib/api";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { Access, Car } from "../lib/realm";
import { RealmContext } from "../context/realm";

export function HomeScreen() {
  const [carId, setCarId] = useState<string | null>(null);

  const [cars, setCars] = useState<Car[]>([]);

  const { realm } = useContext(RealmContext);

  useEffect(() => {
    if (!realm) {
      return;
    }

    const objects = realm.objects<Car>("Car");

    objects.addListener((collection) => {
      setCars(collection.toJSON() as Car[]);
    });

    return () => {
      objects.removeAllListeners();
    };
  }, [realm]);

  async function onRelease() {
    if (!carId || !realm) {
      return;
    }

    const car = realm.objectForPrimaryKey<Car>("Car", carId);

    if (!car) {
      return;
    }

    realm.write(() => {
      realm.create<Access>("Access", {
        id: Math.random().toString(),
        date: dayjs().toDate(),
        car: car,
      });
    });
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
