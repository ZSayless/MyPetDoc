import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeBanner from "./HomeBanner";

function Home() {
  return (
    <div className="min-h-screen pt-[50px]">
      <HomeBanner />
      <HomeCity />
      <HomePlace />
    </div>
  );
}

export default Home;
