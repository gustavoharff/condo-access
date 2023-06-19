import {
  View,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ActionButtonProps extends TouchableWithoutFeedbackProps {}

export function ActionButton(props: ActionButtonProps) {
  return (
    <TouchableOpacity
      className="w-12 h-12 absolute bottom-4 right-4 bg-red-500 rounded-full shadow-2xl items-center justify-center"
      activeOpacity={0.6}
      {...props}
    >
      <MaterialCommunityIcons name="plus" size={28} color="white" />
    </TouchableOpacity>
  );
}
