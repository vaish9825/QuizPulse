import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ChevronDown,
  FileText,
  FolderOpen,
} from "lucide-react";

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
              AI-powered Quiz Platform
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "font-medium text-blue-600"
                : "font-medium text-slate-600 hover:text-blue-600"
            }
          >
            Home
          </Link>

          <button
            onClick={() => {
              if (location.pathname === "/") {
                document
                  .getElementById("my-quizzes")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              } else {
                navigate("/");

                setTimeout(() => {
                  document
                    .getElementById(
                      "my-quizzes"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 150);
              }
            }}
            className="font-medium text-slate-600 hover:text-blue-600"
          >
            My Quizzes
          </button>

          <Link
            to="/create"
            className={
              location.pathname.startsWith(
                "/create"
              )
                ? "font-medium text-blue-600"
                : "font-medium text-slate-600 hover:text-blue-600"
            }
          >
            Create Quiz
          </Link>

          {/* AI Dropdown */}

          <div className="group relative">

  <button className="flex items-center gap-1 font-medium text-slate-600 hover:text-blue-600">

    Generate AI Quiz

    <ChevronDown size={16} />

  </button>

  <div
    className="
      invisible
      absolute
      left-0
      top-full
      mt-2
      w-72
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-2
      opacity-0
      shadow-xl
      transition-all
      duration-200
      group-hover:visible
      group-hover:opacity-100
    "
  >

    <Link
      to="/ai"
      className="flex items-start gap-4 rounded-xl p-3 transition hover:bg-slate-50"
    >
      <FileText
        className="mt-1 text-blue-600"
        size={20}
      />

      <div>

        <p className="font-semibold text-slate-900">
          Topic & Details
        </p>

        <p className="text-sm text-slate-500">
          Generate quizzes from any topic
        </p>

      </div>

    </Link>

    <button
      disabled
      className="flex w-full cursor-not-allowed items-start gap-4 rounded-xl p-3 opacity-60"
    >

      <FolderOpen
        className="mt-1 text-green-600"
        size={20}
      />

      <div className="text-left">

        <p className="font-semibold text-slate-900">
          Upload PDF
        </p>

        <p className="text-sm text-slate-500">
          Coming Soon
        </p>

      </div>

    </button>

  </div>

</div>

          <Link
            to="/join"
            className={
              location.pathname.startsWith(
                "/join"
              )
                ? "font-medium text-blue-600"
                : "font-medium text-slate-600 hover:text-blue-600"
            }
          >
            Join Quiz
          </Link>

          <button
            onClick={handleFAQClick}
            className="font-medium text-slate-600 hover:text-blue-600"
          >
            FAQ
          </button>

        </nav>

        {/* Right */}

        <span className="hidden rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 md:block">
          Create • Host • Play
        </span>

      </div>

    </header>
  );
}