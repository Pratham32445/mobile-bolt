import React from "react";
import Appbar from "../src/components/Appbar";
import Prompt from "../src/components/Prompt";

const Landing = () => {
  return (
    <div>
      <Appbar />
      <div>
        <div className="max-w-2xl m-auto flex justify-center pt-32">
          <div>
            <p className="text-3xl font-bold">
              What do you want to build today ?
            </p>
            <p className="text-center my-3">
              Give your Idea we will make it reality ?
            </p>
            <Prompt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
