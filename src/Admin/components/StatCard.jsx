export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`rounded-xl p-6 text-white shadow ${color}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
        <Icon size={36} className="opacity-80" />
      </div>

      <button className="text-sm underline hover:opacity-80">
        Detail
      </button>
    </div>
  );
}
