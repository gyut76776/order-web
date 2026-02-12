export default function MenuItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 w-full"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


