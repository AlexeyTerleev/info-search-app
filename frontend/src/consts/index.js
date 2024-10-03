import AddPage from "../pages/AddPage/AddPage";
import MainPage from "../pages/MainPage/MainPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import HelpPage from "../pages/HelpPage/HelpPage";

export const APP_ROUTES = {
    home: {
        route: "/",
        element: <MainPage />,
    },
    search: {
        route: "/search",
        element: <SearchPage />,
    },
    add: {
        route: "/add",
        element: <AddPage />,
    },
    help: {
        route: "/help",
        element: <HelpPage />,
    },
};
