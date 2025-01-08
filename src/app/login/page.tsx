import { AuthPage } from "@components/auth-page";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";

export default async function Login() {
  const data = await getData();

  // 認証済みの場合、リダイレクト
  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  // ログインページを表示
  return <AuthPage type="login" />;
}

async function getData() {
  try {
    // refine-firebase を使用した認証チェック
    const { authenticated, redirectTo } = await authProviderServer.check();

    return {
      authenticated,
      redirectTo,
      error: null,
    };
  } catch (error) {
    console.error("Authentication check failed:", error);
    return {
      authenticated: false,
      redirectTo: null,
      error,
    };
  }
}
