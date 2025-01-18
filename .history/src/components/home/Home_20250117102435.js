import React from "react";
import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeBanner from "./HomeBanner";
import HomeFeatures from "./HomeFeatures";
import HomeBlogs from "./HomeBlogs";
import HospitalList from "./HospitalList";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="will-change-transform">
        <HomeBanner />
      </div>
      <div className="will-change-transform">
        <HomeFeatures />
      </div>
      <div className="will-change-transform">
        <HospitalList />
      </div>
      <div className="will-change-transform">
        <HomeCity />
      </div>
      <div className="will-change-transform">
        <HomePlace />
      </div>
      <div className="will-change-transform">
        <HomeBlogs />
      </div>
    </div>
  );
}

export default Home;
