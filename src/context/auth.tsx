import { useRouter, useSegments } from "expo-router";
import React, { PropsWithChildren } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextData {
  user: User | null;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function Provider(props: PropsWithChildren) {
  const [user, setAuth] = React.useState<User | null>({
    id: "1",
    name: "asda",
    email: "asdas",
  });

  useProtectedRoute(user);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
