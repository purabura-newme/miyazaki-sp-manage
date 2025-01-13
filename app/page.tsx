"use client";

import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import dynamic from "next/dynamic";
import outputs from "../src/amplifyconfiguration.json";

// AdminAppComponent を動的にインポートし、SSR を無効化
const AdminAppComponent = dynamic(() => import("../components/AdminApp"), { ssr: false });

// Amplify の設定
Amplify.configure(outputs);

const App = () => {
  return (
    <AdminAppComponent /> // JSX 要素としてレンダリング
  );
};

export default App;
