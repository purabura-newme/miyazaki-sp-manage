"use client";

import type { Schema } from "@/amplify/data/resource";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import jsonServerProvider from 'ra-data-json-server';
import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';
import {
  firebaseDataProvider,
} from '../firebaseConfig';
import authProvider from '../providers/authProvider';
import outputs from "../src/amplifyconfiguration.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (<Admin authProvider={authProvider} dataProvider={firebaseDataProvider}>
   <Resource
      name="notifications"
      list={ListGuesser}
      edit={EditGuesser}
    />
</Admin>);

export default App;
