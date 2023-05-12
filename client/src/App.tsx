import * as React from "react";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {ProLayout} from "@ant-design/pro-components";
import "./App.css";
import DriversPage from "./pages/driversPage";
import VehiclesPage from "./pages/vehiclesPage";
import TripsPage from "./pages/tripsPage";
import RoutePointsPage from "./pages/routePointsPage";
import RoutesPage from "./pages/routesPage";

const defaultMenus = [
    {
        path: "/drivers",
        name: "drivers"
    },
    {
        path: "/vehicles",
        name: "vehicles"
    },
    {
        path: "/trips",
        name: "trips"
    },
    {
        path: "/route_points",
        name: "route_points"
    },
    {
        path: "/routes",
        name: "routes"
    }
];

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Routes>
            <Route
                path="*"
                element={
                    <>
                        <ProLayout
                            fixSiderbar
                            location={{
                                pathname: location.pathname
                            }}
                            breakpoint="xl"
                            route={{
                                routes: defaultMenus
                            }}
                            logo={<></>}
                            title={false}
                            layout="mix"
                            menuItemRender={(
                                item: {path: any},
                                dom:
                                    | string
                                    | number
                                    | boolean
                                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                    | React.ReactFragment
                                    | React.ReactPortal
                                    | null
                                    | undefined
                            ) => (
                                <div
                                    onClick={() => {
                                        navigate(item.path || "/");
                                    }}
                                >
                                    {dom}
                                </div>
                            )}
                        >
                            <Routes>
                                <Route path="drivers" element={<DriversPage />} />
                                <Route path="vehicles" element={<VehiclesPage />} />
                                <Route path="trips" element={<TripsPage />} />
                                <Route path="route_points" element={<RoutePointsPage />} />
                                <Route path="routes" element={<RoutesPage />} />
                            </Routes>
                        </ProLayout>
                    </>
                }
            />
        </Routes>
    );
};

export default App;
