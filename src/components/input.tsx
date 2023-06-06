import { TextInput, TextInputProps } from "react-native";
import { gray } from "tailwindcss/colors";
import classNames from "classnames";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={gray[600]}
      className={classNames(
        "w-full border-b border-solid border-gray-600 p-2 font-poppins-400 text-white",
        props.className
      )}
    />
  );
}
