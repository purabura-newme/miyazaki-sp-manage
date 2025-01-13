"use client";

import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import dynamic from "next/dynamic";
import outputs from "../src/amplifyconfiguration.json";

const AdminAppComponent = dynamic(
  () => import("../components/AdminApp"),
  { ssr: false }
)

Amplify.configure(outputs);

const App = () => {
  return (
    AdminAppComponent
  );
};

export default App;
