import HomeSearch from "./HomeSearch";
import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeWork from "./HomeWork";
import HomeSay from "./HomeSay";

function Home() {
  return (
    <>
      {/* Banner Visual */}
      <div className="relative h-[600px]">
        <img
          src="https://bizmap.dexignzone.com/react/demo/static/media/banner.d0e7a3c5.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              Welcome to MyPetDoc
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-3xl">
              Your trusted partner in pet healthcare. Find the best veterinary services near you.
            </p>
          </div>
        </div>
      </div>

      {/* Other components */}
      <HomePlace />
      <HomeCity />
    </>
  );
}

export default Home;
