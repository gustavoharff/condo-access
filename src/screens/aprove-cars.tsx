import { ScrollView, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../src/components/header";
import { Car } from "../lib/realm";
import { RealmContext } from "../context/realm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { green } from "tailwindcss/colors";
import { UpdateMode } from "realm";

export function AproveCarsScreen() {
  const [cars, setCars] = useState<Car[]>([]);

  const { realm } = useContext(RealmContext);

  useEffect(() => {
    if (!realm) {
      return;
    }

    const objects = realm
      .objects<Car>("Car")
      .filtered("status == $0", "pending");

    objects.addListener((collection) => {
      setCars(collection.toJSON() as Car[]);
    });

    return () => {
      objects.removeAllListeners();
    };
  }, [realm]);

  return (
    <View className="flex-1 relative bg-[#212529]">
      <Header className="m-4">
        <Header.Title>Carros do condomínio</Header.Title>
        <Header.Description>
          Aprove a solicitação de acesso de um morador.
        </Header.Description>
      </Header>

      <ScrollView className="px-4 gap-2">
        {cars.map((car) => (
          <View
            key={car.id}
            className="border border-solid items-center border-gray-600 p-3 rounded-lg flex-row justify-between bg-[#1E2225]"
          >
            <Text className="font-poppins-400 text-white">{car.plate}</Text>

            {car.status === "pending" && (
              <MaterialCommunityIcons
                name="clock-outline"
                color={green[500]}
                size={24}
                onPress={() => {
                  if (!realm) {
                    return;
                  }

                  realm.write(() => {
                    car.status = "approved";

                    realm.create<Car>("Car", car, UpdateMode.Modified);
                  });
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
