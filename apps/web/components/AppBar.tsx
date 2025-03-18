"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const AppBar = () => {
  const [themeStatus, setThemeStatus] = useState("light");
  return (
    <div className="flex justify-between items-center p-4">
      <p className="text-2xl font-bold">Bolty</p>
      <div className="flex items-center gap-4">
        {themeStatus == "dark" ? (
          <Sun onClick={() => setThemeStatus("light")} />
        ) : (
          <Moon onClick={() => setThemeStatus("dark")} />
        )}
        <Button>Sign in</Button>
      </div>
    </div>
  );
};

export default AppBar;
