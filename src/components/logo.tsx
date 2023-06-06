import { MaterialCommunityIcons, createIconSet } from "@expo/vector-icons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import { red } from "tailwindcss/colors";

export function Logo(props: Omit<IconProps<"">, "name">) {
  return <MaterialCommunityIcons name="boom-gate-arrow-up" color={red[500]} {...props} />;
}
