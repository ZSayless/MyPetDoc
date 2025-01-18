import React from "react";
import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeBanner from "./HomeBanner";
import HomeBlogs from "./HomeBlogs";
import HospitalList from "./HospitalList";

function Home() {
  return (
    <main className="overflow-x-hidden">
      <section className="transform-gpu">
        <HomeBanner />
      </section>

      <section className="transform-gpu">
        <HospitalList />
      </section>

      <section className="transform-gpu">
        <HomeCity />
      </section>

      <section className="transform-gpu">
        <HomePlace />
      </section>

      <section className="transform-gpu">
        <HomeBlogs />
      </section>
    </main>
  );
}

export default Home;
