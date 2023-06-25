import { Text, View } from "react-native";
import { Header } from "../../src/components/header";
import ButtonCircular from "../../src/components/circular-button";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Access, Car, Session } from "../lib/realm";
import { RealmContext } from "../context/realm";
import * as Crypto from "expo-crypto";

export function HomeScreen() {
  const [carId, setCarId] = useState<string | null>(null);

  const [cars, setCars] = useState<Car[]>([]);

  const { realm } = useContext(RealmContext);

  useEffect(() => {
    if (!realm) {
      return;
    }

    const user = realm.objects<Session>("Session")[0].user;

    const objects = realm
      .objects<Car>("Car")
      .filtered("user = $0 and status == 'approved'", user);

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
        id: Crypto.randomUUID(),
        date: dayjs().toDate(),
        car: car,
        user: realm.objects<Session>("Session")[0].user,
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
        dropdownIconColor={"white"}
      >
        {cars.map((item) => (
          <Picker.Item
            key={item.id}
            label={item.plate}
            value={item.id}
            color="white"
            style={{
              backgroundColor: "#212529",
            }}
          />
        ))}
      </Picker>

      <View className="items-center my-auto flex-1 justify-end pb-4">
        {/* @ts-ignore */}
        <ButtonCircular onRelease={onRelease} />
      </View>
    </View>
  );
}
