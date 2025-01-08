import { cookies } from "next/headers";

export const authProviderServer = {
  check: async () => {
    const cookieStore = cookies();
    const firebaseToken = cookieStore.get("firebaseToken");

    if (!firebaseToken) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }

    try {
      // トークンが存在すれば認証済みとみなす
      return { authenticated: true };
    } catch (error) {
      console.error("Authentication check failed:", error);
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }
  },

  logout: async () => {
    try {
      const cookieStore = cookies();

      // `firebaseToken` クッキーを削除
      cookieStore.set("firebaseToken", "", {
        path: "/",
        expires: new Date(0), // 過去の日付でクッキーを削除
      });

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        success: false,
        error: "ログアウト中にエラーが発生しました。",
      };
    }
  },
};
