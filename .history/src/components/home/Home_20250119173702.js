import React, { Suspense } from "react";

const HomeCity = React.lazy(() => import("./HomeCity"));
const HomePlace = React.lazy(() => import("./HomePlace"));
const HomeBanner = React.lazy(() => import("./HomeBanner"));
const HomeBlogs = React.lazy(() => import("./HomeBlogs"));
const HospitalList = React.lazy(() => import("./HospitalList"));

const LoadingFallback = React.lazy(() => import("../common/LoadingSpinner"));

function Home() {
  return (
    <main className="overflow-x-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <HomeBanner />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section className="transform-gpu">
          <HospitalList />
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
