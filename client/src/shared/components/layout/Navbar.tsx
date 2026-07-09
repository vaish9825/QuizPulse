import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleFAQClick() {
    if (location.pathname === "/") {
      document
        .getElementById("faq")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    } else {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("faq")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 150);
    }
  }

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Create Quiz",
      href: "/create",
    },
    {
      name: "Join Quiz",
      href: "/join",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-lg">
            ⚡
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              QuizPulse
            </h1>

            <p className="text-xs text-slate-500">
              Live Quiz Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 md:flex">

          {links.map((link) => {
            const active =
              link.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(
                    link.href
                  );

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors ${
                  active
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button
            onClick={handleFAQClick}
            className="font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            FAQ
          </button>

        </nav>

        {/* Right */}

        <div className="flex items-center gap-4">

          <span className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 md:block">
            Create • Host • Play
          </span>

        </div>

      </div>
    </header>
  );
}