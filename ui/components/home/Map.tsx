/** @format */
import React, { Suspense } from "react";
import { locations } from "./maps/cities";
const LazyLargeMap = React.lazy(() => import("./maps/Algeria"));

const Map = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div></div>
      <div className="">
        <LazyLargeMap locations={locations} />
      </div>
    </div>
  );
};

export default Map;
