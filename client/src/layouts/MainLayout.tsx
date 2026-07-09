import { Outlet } from "react-router-dom";

import { Navbar } from "../shared/components/layout/Navbar";
import Footer from "../shared/components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;