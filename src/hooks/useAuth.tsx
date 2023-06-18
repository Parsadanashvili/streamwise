"use client";

import Cookies from "js-cookie";
import { getMe } from "@/api/auth/auth";
import wiseApi from "@/api/wiseApi";
import { User } from "@/types";
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface authConfig {
  _session: User | null;
  _getSession: () => Promise<void>;
}

const _AUTH_: authConfig = {
  _session: null,
  _getSession: async () => {},
};

type Status = "authenticated" | "loading" | "unauthenticated";

interface AuthContextType {
  user: User | null;
  status: Status;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "loading",
});

interface AuthProviderProps {
  value: User | null;
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ value, children }) => {
  const hasInitialUser = value != null;

  const [user, setUser] = useState<User | null>(() => {
    if (hasInitialUser) _AUTH_._session = value;

    return value;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    _AUTH_._getSession = async () => {
      const token = Cookies.get("accessToken");

      if (token) {
        setIsLoading(true);

        const res = await getMe("");

        setIsLoading(false);

        setUser(res.data);

        return;
      }

      setUser(null);
    };
  }, []);

  const v = useMemo(() => {
    return {
      user,
      status: (isLoading
        ? "loading"
        : user
        ? "authenticated"
        : "unauthenticated") as Status,
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={v}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const login = async ({
  credentials,
  redirectTo,
}: {
  credentials: { email: string; password: string };
  redirectTo?: string;
}) => {
  try {
    const res = await wiseApi.post("/auth/token", credentials);

    if (res.data != null) {
      Cookies.set("accessToken", res.data.token);

      await _AUTH_._getSession();

      window.location.href = redirectTo ?? "/";
    }

    return {
      ok: true,
    };
  } catch (err: any) {
    return {
      ok: false,
      error: err.response.data.error,
    };
  }
};

export const signup = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await wiseApi.post("/auth/signup", data);

    if (res.data != null) {
      Cookies.set("accessToken", res.data.token);

      await _AUTH_._getSession();

      window.location.href = "/";
    }

    return {
      ok: true,
    };
  } catch (err: any) {
    return {
      ok: false,
      error: err.response.data.error,
    };
  }
};

export const logout = async () => {
  try {
    await wiseApi.post("/auth/token/revoke");

    Cookies.remove("accessToken");

    await _AUTH_._getSession();

    return {
      ok: true,
    };
  } catch (err: any) {
    return {
      ok: false,
      error: err.response.data.error,
    };
  }
};
