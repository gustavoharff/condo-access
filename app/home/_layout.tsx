import { Stack, Slot } from "expo-router";
import { Provider } from "../../src/context/auth";
import { Logo } from "../../src/components/logo";
import { gray } from "tailwindcss/colors";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Provider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <Logo size={28} />,
            headerStyle: {
              backgroundColor: '#1E2225',
            },
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack>
    </Provider>
  );
}
