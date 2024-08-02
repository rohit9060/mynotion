import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  avatar: string | null;
  role: string;
  email: string;
}

interface AuthState {
  auth: {
    isAuth: boolean;
    user: User;
  };
  signIn: (user: User) => void;
  signOut: () => void;
}

let initialState = {
  isAuth: false,
  user: {
    id: "",
    name: "",
    avatar: null,
    role: "",
    email: "",
  },
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: initialState,
        signIn: (user) => set(() => ({ auth: { isAuth: true, user: user } })),
        signOut: () => set(() => ({ auth: initialState })),
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
