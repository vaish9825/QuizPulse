import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-indigo-500">
          QuizPulse
        </h1>

        <Button variant="outline">
          Sign In
        </Button>
      </div>
    </header>
  );
}