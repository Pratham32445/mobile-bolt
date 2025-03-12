import React from "react";
import { Button } from "@/components/ui/button";

const Appbar = () => {
  return (
    <div className="flex items-center justify-between p-4 px-6">
      <div>
        <p className="text-2xl">Bolty</p>
      </div>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
};

export default Appbar;
