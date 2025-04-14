export function DoubleBorder({ children }) {
  return (
    <div className="rounded-4xl p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
      <div className="rounded-3xl bg-white ring-1 shadow-2xl ring-black/5">
        {children}
      </div>
    </div>
  );
}
