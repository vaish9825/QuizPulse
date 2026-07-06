import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-indigo-500"
        >
          QuizPulse
        </Link>

        <div className="flex gap-3">
          <button className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:border-indigo-500">
            Join Room
          </button>

          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500">
            Create Quiz
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;