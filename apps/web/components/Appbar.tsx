import React from "react";
import { Button } from "./ui/button";

const Appbar = () => {
  return (
    <div className="flex items-center justify-between p-5">
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
