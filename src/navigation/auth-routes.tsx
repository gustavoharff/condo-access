import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/auth";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}
