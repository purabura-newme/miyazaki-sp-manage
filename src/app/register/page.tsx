import { AuthPage } from "@components/auth-page";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";

export default async function Register() {
  const data = await getData();

  // 認証済みの場合、リダイレクト
  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  // 登録ページを表示
  return <AuthPage type="register" />;
}

async function getData() {
  try {
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
