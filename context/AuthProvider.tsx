import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import instance from "../pages/api/axios";
import { isAxiosError } from "axios";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

// User 타입 정의
interface User {
  updatedAt?: string;
  createdAt?: string;
  image?: string;
  nickname?: string;
  id?: number;
  // 다른 필요한 속성들 추가
}

// AuthContext 타입 정의
interface AuthContextType {
  user: User | null;
  isPending: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<{
    user: User | null;
    isPending: boolean;
  }>({
    user: null,
    isPending: true, // 초기 isPending 상태를 true로 설정
  });

  async function getMe() {
    console.log("getMe 함수 시작");
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));

    try {
      const res = await instance.get("/users/me");
      const userData = res.data;

      const nextUser: User = {
        id: userData.id,
        image: userData.image,
        nickname: userData.nickname,
        updatedAt: userData.updatedAt,
        createdAt: userData.createdAt,
      };

      localStorage.setItem("user", JSON.stringify(nextUser));

      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("API 요청 오류:", error.response?.data);
      } else {
        console.error("기타 오류:", error);
      }

      setValues((prevValues) => ({
        ...prevValues,
        user: null,
        isPending: false,
      }));
    }
  }

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const response = await instance.post("/auth/signIn", {
      email,
      password,
    });
    const { accessToken, refreshToken, user } = response.data;

    const userData: User = {
      id: user.id,
      image: user.image,
      nickname: user.nickname,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };

    setCookie("accessToken", accessToken, { maxAge: 60 * 60 * 24 });
    setCookie("refreshToken", refreshToken, { maxAge: 60 * 60 * 24 });

    localStorage.setItem("user", JSON.stringify(userData));

    setValues((prevValues) => ({
      ...prevValues,
      user: userData,
      isPending: false,
    }));
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setValues((prevValues) => ({
        ...prevValues,
        user: JSON.parse(storedUser),
        isPending: false,
      }));
    } else {
      getMe();
    }
  }, []);

  const logout = () => {
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
      isPending: false,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required: boolean = true) {
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push("/login");
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}
