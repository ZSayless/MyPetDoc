import HomeSearch from "./HomeSearch";
import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeWork from "./HomeWork";
import HomeSay from "./HomeSay";

function Home() {
  return (
    <>
      {/* Banner Visual */}
      <div className="relative h-screen bg-gray-800">
        <div className="absolute inset-0">
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="w-1/2">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Discover the Ideal<br />
                Pet Hospital for You<br />
                Today!
              </h1>
              <p className="text-lg text-white mb-8 max-w-xl">
                Welcome to MyPetDoc, your trusted directory for pet hospitals in
                Vietnam. Explore our extensive listings to find the best care for your
                furry friends.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded hover:bg-gray-100 transition-colors">
                  Search
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-medium rounded hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="w-1/2 flex justify-center">
              {/* Placeholder for banner image */}
              <div className="w-[400px] h-[300px] bg-gray-700 rounded-lg"></div>
            </div>
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
