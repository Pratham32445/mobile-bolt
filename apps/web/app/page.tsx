import AppBar from "@/components/AppBar";
import PromptScreen from "@/components/PromptScreen";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/options";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <AppBar />
      <PromptScreen />{" "}
    </div>
  );
};

export default Home;
