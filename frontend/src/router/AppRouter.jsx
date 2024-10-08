import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { APP_ROUTES } from "../consts";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={APP_ROUTES.home.route}
                    element={APP_ROUTES.home.element}
                />
                <Route
                    path={APP_ROUTES.search.route}
                    element={APP_ROUTES.search.element}
                />
                <Route
                    path={APP_ROUTES.add.route}
                    element={APP_ROUTES.add.element}
                />
                <Route
                    path={APP_ROUTES.help.route}
                    element={APP_ROUTES.help.element}
                />
            </Routes>
        </BrowserRouter>
    );
};
