import HomeCity from "./HomeCity";
import HomePlace from "./HomePlace";
import HomeBanner from "./HomeBanner";
import { useNavigate } from "react-router-dom";

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer"
      onClick={() => navigate(`/hospital/search?city=${city.id}`)}
    >
      <img 
        src={city.image} 
        alt={city.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
        <p className="text-sm mb-2">{city.description}</p>
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
          {city.hospitalCount}
        </span>
      </div>
    </div>
  );
};

function Home() {
  return (
    <div>
      <HomeBanner />
      <HomeCity />
      <HomePlace />
    </div>
  );
}

export default Home;
