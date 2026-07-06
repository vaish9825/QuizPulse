const HomePage = () => {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-300">
        AI Powered • Live • Real-Time Analytics
      </p>

      <h1 className="max-w-4xl text-6xl font-extrabold leading-tight">
        Host engaging
        <span className="text-indigo-500"> live quizzes </span>
        with AI.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-400">
        Create quizzes instantly using AI, invite players with a QR code,
        compete in real time, and analyze performance through interactive
        dashboards.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-xl bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500">
          Create Quiz
        </button>

        <button className="rounded-xl border border-slate-700 px-6 py-3 font-medium transition hover:border-indigo-500">
          Join Room
        </button>
      </div>
    </section>
  );
};

export default HomePage;