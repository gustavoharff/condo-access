import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Text, View, ViewProps } from "react-native";

export function Header(props: ViewProps) {
  return (
    <View
      className={classNames(
        "p-4 border border-solid border-gray-600 rounded-xl bg-[#1E2225]",
        props.className
      )}
      {...props}
    >
      {props.children}
    </View>
  );
}

function Title(props: PropsWithChildren) {
  return (
    <Text className="font-poppins-700 text-white text-lg">
      {props.children}
    </Text>
  );
}

function Description(props: PropsWithChildren) {
  return (
    <Text className="font-poppins-400 text-gray-400 text-sm">
      {props.children}
    </Text>
  );
}

Header.Title = Title;
Header.Description = Description;
