"use client";
import { firebaseApp } from "@providers/data-provider/firebaseConfig";
import type { AuthPageProps } from "@refinedev/core";
import { AuthPage as AuthPageBase } from "@refinedev/mui";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const auth = getAuth(firebaseApp);

export const AuthPage = (props: AuthPageProps) => {
  const router = useRouter();

  const handleRegister = async (values: { email: string; password: string }) => {
    if (!values.email || !values.password) {
      console.error("Email and password are required.");
      return;
    }

    try {
      // Firebase Authentication で新規ユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const token = await userCredential.user.getIdToken();

      // トークンをクッキーに保存
      document.cookie = `firebaseToken=${token}; path=/; SameSite=Strict`;

      // 会員登録後にトップページへ遷移
      router.push("/"); // トップページに遷移
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    if (!values.email || !values.password) {
      console.error("Email and password are required.");
      return;
    }

    try {
      // Firebase Authentication でログイン
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const token = await userCredential.user.getIdToken();

      // トークンをクッキーに保存
      document.cookie = `firebaseToken=${token}; path=/; SameSite=Strict`;

      // ログイン後にトップページへ遷移
      router.push("/"); // トップページに遷移
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const formType = props.type;

  return (
    <AuthPageBase
      {...props}
      formProps={{
        ...props.formProps,
        onSubmit: formType === "register" ? handleRegister : handleLogin,
      }}
    />
  );
};
