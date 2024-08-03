import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

// Define the User interface
interface User {
  id: string;
  name: string;
  avatar: string | null;
  role: string;
  email: string;
}

// Define the AuthState interface
interface AuthState {
  auth: {
    isAuth: boolean;
    user: User;
  };
  signIn: (user: User) => void;
  signOut: () => void;
}

// Define the initial state
const initialState = {
  isAuth: false,
  user: {
    id: "",
    name: "",
    avatar: null,
    role: "",
    email: "",
  },
};

// Encryption key
const SECRET_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY as string;

// Encrypt data before storing it
const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Decrypt data when retrieving it
const decrypt = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Custom storage to encrypt/decrypt data
const createEncryptedStorage = () => {
  return {
    getItem: (name: string) => {
      const encryptedItem = localStorage.getItem(name);
      if (!encryptedItem) return null;
      return decrypt(encryptedItem);
    },
    setItem: (name: string, value: string) => {
      const encryptedValue = encrypt(value);
      localStorage.setItem(name, encryptedValue);
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name);
    },
  };
};

// Create the auth store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: initialState,
        signIn: (user) => set(() => ({ auth: { isAuth: true, user: user } })),
        signOut: () => set(() => ({ auth: initialState })),
      }),
      {
        name: "auth", // Key for storage
        storage: createJSONStorage(createEncryptedStorage), // Use encrypted storage for persistence
      }
    )
  )
);
