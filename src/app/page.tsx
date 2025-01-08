"use client";

import { Authenticated, useResource } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function IndexPage() {
  const { resources } = useResource();
  const router = useRouter();

  console.log("Resources:", resources); // デバッグ用

  return (
    <Suspense>
      <Authenticated key="home-page">
        {resources && resources.length > 0 ? (
          <>
            <h1>Redirecting to {resources[0]?.name}</h1>
            {router.push(resources[0]?.route || "/")}
          </>
        ) : (
          <>
            <h1>Welcome</h1>
            <p>No resources available. Please configure your resources.</p>
          </>
        )}
      </Authenticated>
    </Suspense>
  );
}
