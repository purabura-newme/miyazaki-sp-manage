"use client";

import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { useNavigate } from "react-router-dom"; // useNavigateを追加

const Login = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const navigate = useNavigate(); // useNavigateを使用

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await login({ username: email, password });
      notify("ログイン成功", { type: "success" });
      navigate("/notifications"); // 明示的に遷移
    } catch (error) {
      notify("ログインに失敗しました", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField label="メールアドレス" name="email" fullWidth required />
        <TextField
          label="パスワード"
          name="password"
          type="password"
          fullWidth
          required
          style={{ marginTop: "10px" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </Button>
      </form>
    </Card>
  );
};

export default Login;
