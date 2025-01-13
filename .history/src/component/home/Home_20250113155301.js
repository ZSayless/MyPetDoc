import React from "react";
import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeBanner from "./HomeBanner";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <HomeBanner />
      <div className="will-change-transform">
        <HomeCity />
      </div>
      <div className="will-change-transform">
        <HomePlace />
      </div>
    </div>
  );
}

export default Home;
