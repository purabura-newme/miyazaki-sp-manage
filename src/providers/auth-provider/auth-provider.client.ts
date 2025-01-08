"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";
import { FirebaseAuth } from "refine-firebase";
import { firebaseApp } from "../data-provider/firebaseConfig";

// FirebaseAuth インスタンスを作成
const firebaseAuth = new FirebaseAuth(undefined, firebaseApp);

export const authProviderClient: AuthProvider = {
  login: async ({ email, password, remember }) => {
    try {
      // FirebaseAuth クラスの handleLogIn を使用
      await firebaseAuth.handleLogIn({ email, password, remember });

      // FirebaseAuth クラスの currentUser からトークンを取得
      const user = firebaseAuth.auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }
      const token = await user.getIdToken();

      // トークンをクッキーに保存
      Cookies.set("firebaseToken", token, {
        expires: remember ? 30 : undefined, // 30日間またはセッションごと
        path: "/",
      });

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error: any) {
      const message = error.message || "ログインに失敗しました。";
      console.error("Login failed:", message);
      return {
        success: false,
        error: {
          name: "LoginError",
          message,
        },
      };
    }
  },
  logout: async () => {
    try {
      // FirebaseAuth クラスの handleLogOut を使用
      await firebaseAuth.handleLogOut();

      // クッキーを削除
      Cookies.remove("firebaseToken", { path: "/" });

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error: any) {
      const message = error.message || "ログアウトに失敗しました。";
      console.error("Logout failed:", message);
      return {
        success: false,
        error: {
          name: "LogoutError",
          message,
        },
      };
    }
  },
  check: async () => {
    const token = Cookies.get("firebaseToken");

    if (!token) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }

    try {
      const user = firebaseAuth.auth.currentUser;
      if (user) {
        return { authenticated: true };
      }
      throw new Error("User not authenticated");
    } catch (error) {
      const message = error.message || "認証確認に失敗しました。";
      console.error("Check auth failed:", message);
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => {
    try {
      // FirebaseAuth クラスの getPermissions を使用
      const permissions = await firebaseAuth.getPermissions();
      return permissions;
    } catch (error) {
      const message = error.message || "権限取得に失敗しました。";
      console.error("Get permissions failed:", message);
      return null;
    }
  },
  getIdentity: async () => {
    try {
      const user = firebaseAuth.auth.currentUser;
      if (user) {
        return {
          id: user.uid || "",
          name: user.displayName || "Anonymous",
          email: user.email || "",
          avatar: user.photoURL || "",
        };
      }
      return null;
    } catch (error) {
      const message = error.message || "ユーザー情報の取得に失敗しました。";
      console.error("Get identity failed:", message);
      return null;
    }
  },
  onError: async (error) => {
    if ((error as any)?.response?.status === 401) {
      return {
        logout: true,
      };
    }
    return { error };
  },
};
