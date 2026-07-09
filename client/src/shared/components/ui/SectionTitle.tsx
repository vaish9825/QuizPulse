interface Props {
  children: React.ReactNode;
}

export function SectionTitle({
  children,
}: Props) {
  return (
    <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
      {children}
    </h2>
  );
}