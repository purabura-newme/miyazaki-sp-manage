// components/AdminApp.tsx
"use client";

import "@aws-amplify/ui-react/styles.css";
import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import {
  firebaseDataProvider,
} from '../firebaseConfig';
import authProvider from '../providers/authProvider';

const AdminApp = () => {
  if (!firebaseDataProvider) {
    return <div>Loading...</div>; // firebaseDataProvider がまだ初期化されていない場合
  }

  return (
    <Admin authProvider={authProvider} dataProvider={firebaseDataProvider}>
      <Resource
        name="notifications"
        list={ListGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
};

export default AdminApp;
