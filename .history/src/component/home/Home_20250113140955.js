import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeBanner from "./HomeBanner";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[500px] mb-12">
        <img
          src="https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143920.jpg"
          alt="Pet Care Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Quality Pet Care At Your Fingertips
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8">
            Find the best veterinary hospitals for your beloved pets
          </p>
          <Link
            to="/find-hospital"
            className="bg-[#98E9E9] text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-[#7CD5D5] transition-colors"
          >
            Find a Hospital
          </Link>
        </div>
      </div>

      <HomeCity />
      <HomePlace />
    </div>
  );
}

export default Home;
