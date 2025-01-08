import { ShoppingCart, Candy, Cake, Map, Carrot, Pill } from "lucide-react";

function HomeSearch() {
  return (
    <div className="hero-section relative flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto py-[120px] px-4 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-[32px] md:text-[40px] lg:text-[50px] font-bold text-white">
            Find & Get
          </h1>
          <p className="text-[32px] md:text-[40px] lg:text-[50px] text-white">
            Your Dream Place.
          </p>
        </div>

        <div className="mt-10">
          <div className="max-w-4xl mx-auto rounded-lg shadow-lg bg-white p-3 md:p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 p-2 h-12 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select className="flex-1 p-2 h-12 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500">
                <option>Select Category</option>
                <option>Places</option>
                <option>Food</option>
                <option>Activities</option>
              </select>
              <button className="w-full md:w-[120px] bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 h-12 rounded transition duration-300">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="mt-10 text-center">
            <p className="text-lg text-white mb-6">
              Find awesome places, bars, restaurants & activities.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer">
                <ShoppingCart className="w-8 h-8 text-white" />
                <p className="text-white mt-2">Carts</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer">
                <Carrot className="w-8 h-8 text-white" />
                <p className="text-white mt-2">Foods</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer">
                <Candy className="w-8 h-8 text-white" />
                <p className="text-white mt-2">Candy</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer">
                <Pill className="w-8 h-8 text-white" />
                <p className="text-white mt-2">Medicine</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer">
                <Cake className="w-8 h-8 text-white" />
                <p className="text-white mt-2">Cake</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer">
                <Map className="w-8 h-8 text-white" />
                <p className="text-white mt-2">Place</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSearch;
