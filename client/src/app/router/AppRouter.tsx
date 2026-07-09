import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import ScrollToTop from "@/shared/components/layout/ScrollToTop";

import { routes } from "./routes";

const AppRouter = () => {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;