import { PropsWithChildren } from "react";
import { Provider } from "../../src/context/auth";
import { Slot } from "expo-router";

export default function Root(props: PropsWithChildren) {
  return (  
    <Provider>
      <Slot />
    </Provider>
  )
}
