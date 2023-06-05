import { Stack, Slot } from 'expo-router'
import { Provider } from '../../src/context/auth';

export const unstable_settings = {
  initialRouteName: "index",
}

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <Provider>
      <Slot />
    </Provider>
  );
}