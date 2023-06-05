import classNames from "classnames";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export function Button(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      className={classNames(
        'w-full bg-red-500 p-4 rounded flex items-center justify-center',
        props.className
      )}
    >
      <Text className="text-white font-poppins-400">{props.children}</Text>
    </TouchableOpacity>
  );
}
