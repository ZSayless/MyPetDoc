const HomeWork = () => {
  const steps = [
    {
      icon: (
        <svg
          className="w-12 h-12 text-[#4611a7]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "Choose What To Do?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-[#4611a7]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      title: "Find What Your Want?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-[#4611a7]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Explore Amazing Places",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.",
    },
  ];

  return (
    <div className="relative py-16 bg-[#4611a7]">
      <div className="absolute inset-0 bg-[url('https://bizmap.dexignzone.com/react/demo/static/media/bg1.de44984f.jpg')] bg-cover bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">How It Works?</h2>
          <div className="inline-block w-[50px] h-[3px] mb-[10px] bg-white"></div>
          <p className="text-white/80 max-w-2xl mx-auto text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center group transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-[#fff] transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeWork;
