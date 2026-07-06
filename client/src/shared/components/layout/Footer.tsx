const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} QuizPulse. Built with React & Node.js.
    </footer>
  );
};

export default Footer;