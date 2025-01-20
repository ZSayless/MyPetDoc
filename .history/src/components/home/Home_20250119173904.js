import React, { Suspense } from "react";

const HomeCity = React.lazy(() => import("./HomeCity"));
const HomePlace = React.lazy(() => import("./HomePlace"));
const HomeBanner = React.lazy(() => import("./HomeBanner"));
const HomeBlogs = React.lazy(() => import("./HomeBlogs"));
const HospitalList = React.lazy(() => import("./HospitalList"));

const LoadingFallback = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#98E9E9]"></div>
  </div>
);

function Home() {
  return (
    <main className="overflow-x-hidden">
      <HomeBanner />

      <Suspense fallback={<LoadingFallback />}>
        <section className="transform-gpu">
          <HospitalList />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section className="transform-gpu">
          <HomeCity />
          <HomePlace />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section className="transform-gpu">
          <HomeBlogs />
        </section>
      </Suspense>
    </main>
  );
}

export default Home;
