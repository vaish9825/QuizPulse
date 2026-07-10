import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      id="faq"
      className="mt-20 bg-slate-950 text-slate-300"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">

        {/* Logo */}

        <div>

          <h2 className="text-3xl font-bold text-white">
            QuizPulse
          </h2>

          <p className="mt-5 leading-7 text-slate-400">
            AI-powered multiplayer quiz platform for creating,
            hosting and playing engaging live quizzes in real time.
          </p>

        </div>

        {/* Product */}

        <div>

          <h3 className="font-semibold text-white">
            Product
          </h3>

          <div className="mt-5 space-y-3">

            <Link
              to="/create"
              className="block transition hover:text-blue-400"
            >
              Create Quiz
            </Link>

            <Link
              to="/ai"
              className="block transition hover:text-blue-400"
            >
              Generate AI Quiz
            </Link>

            <Link
              to="/"
              onClick={() =>
                document
                  .getElementById("my-quizzes")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="block transition hover:text-blue-400"
            >
              My Quizzes
            </Link>

            <Link
              to="/join"
              className="block transition hover:text-blue-400"
            >
              Join Quiz
            </Link>

          </div>

        </div>

        {/* Features */}

        <div>

          <h3 className="font-semibold text-white">
            Features
          </h3>

          <div className="mt-5 space-y-3">

  <p>🤖 AI Quiz Generator</p>

  <p>⚡ Real-time Gameplay</p>

  <p>🏆 Live Leaderboards</p>

  <p>📱 QR Room Join</p>

</div>

        </div>

        {/* Resources */}

        <div>

          <h3 className="font-semibold text-white">
            Resources
          </h3>

          <div className="mt-5 space-y-3">

            <a
              href="https://github.com/vaish9825/QuizPulse"
              target="_blank"
              rel="noreferrer"
              className="block transition hover:text-blue-400"
            >
              GitHub
            </a>

            <a
              href="#faq"
              className="block transition hover:text-blue-400"
            >
              FAQ
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} QuizPulse. All rights reserved.
          </p>

          <p>
            Built with ❤️ by Vaishnavi Waghmare
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;