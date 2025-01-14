import React from "react";
import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeBanner from "./HomeBanner";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="will-change-transform">
        <HomeBanner />
      </div>
      <div
        className="will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <HomeCity />
      </div>
      <div
        className="will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <HomePlace />
      </div>
    </div>
  );
}

export default Home;
