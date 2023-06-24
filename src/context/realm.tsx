import { PropsWithChildren, createContext, useEffect, useState } from "react";
import {
  AccessSchema,
  CarSchema,
  SessionSchema,
  UserSchema,
} from "../lib/realm";
import Realm from "realm";
import * as Crypto from "expo-crypto";

interface RealmContextData {
  realm: Realm | null;
}

export const RealmContext = createContext<RealmContextData>(
  {} as RealmContextData
);

export function RealmProvider(props: PropsWithChildren) {
  const [realm, setRealm] = useState<Realm | null>(null);

  useEffect(() => {
    Realm.open({
      schema: [UserSchema, SessionSchema, CarSchema, AccessSchema],
      schemaVersion: 5,
      onFirstOpen: (realm) => {
        realm.create("User", {
          id: Crypto.randomUUID(),
          email: "gustavo.harff@gmail.com",
          password: "123",
          syndic: false,
        });

        realm.create("User", {
          id: Crypto.randomUUID(),
          email: "gustavo@gmail.com",
          password: "123",
          syndic: true,
        });
      },
    }).then((realm) => {
      console.log("open -a Realm\\ Studio.app", realm.path);
      setRealm(realm);
    });
  }, []);

  return (
    <RealmContext.Provider value={{ realm }}>
      {props.children}
    </RealmContext.Provider>
  );
}
