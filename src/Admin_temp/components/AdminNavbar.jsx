export default function AdminNavbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="font-semibold text-lg">Nilu Kopi Godean</h2>

      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="Admin"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">Admin</span>
      </div>
    </header>
  );
}
