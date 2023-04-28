import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DriversPage from "./pages/driversPage";
import VehiclesPage from "./pages/vehiclesPage";
import TripsPage from "./pages/tripsPage";
import RoutePointsPage from "./pages/routePointsPage";
import RoutesPage from "./pages/routesPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="drivers" element={<DriversPage />} />
      <Route path="vehicles" element={<VehiclesPage />} />
      <Route path="trips" element={<TripsPage />} />
      <Route path="route_points" element={<RoutePointsPage />} />
      <Route path="routes" element={<RoutesPage />} />
    </Routes>
  );
};

export default App;
