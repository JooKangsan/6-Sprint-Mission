import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import instance from "../pages/api/axios";
import { isAxiosError } from "axios";
import { setCookie } from "cookies-next";
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
  updateMe: (formData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<{
    user: User | null;
    isPending: boolean;
  }>({
    user: null,
    isPending: false, // 초기 isPending 상태를 false로 설정
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: User | null = null;
    try {
      const res = await instance.get("/users/me");
      const userData = res.data;

      nextUser = {
        id: userData.id,
        image: userData.image,
        nickname: userData.nickname,
        updatedAt: userData.updatedAt,
        createdAt: userData.createdAt,
      };
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        // 로그인하지 않은 상태에서 401 에러를 처리
        console.error("User is not authenticated:", error);
      } else {
        console.error("Error fetching user data:", error);
      }
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
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

    const UserData: User = {
      id: user.id,
      image: user.image,
      nickname: user.nickname,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };

    setCookie("accessToken", accessToken, { maxAge: 60 * 60 * 24 });
    setCookie("refreshToken", refreshToken, { maxAge: 60 * 60 * 24 });

    setValues((prevValues) => ({
      ...prevValues,
      user: UserData,
      isPending: false,
    }));
  }

  async function updateMe(formData: any) {
    const res = await instance.patch("/users/me", formData);
    const nextUser: User = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required: boolean = true) {
  // required 매개변수 기본값 true로 설정
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
    }
  }, [context.user, context.isPending, router, required]);
  return context;
}
