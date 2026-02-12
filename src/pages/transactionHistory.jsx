import React from "react";
import jsPDF from "jspdf";

export default function TransactionHistory() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const handleDownload = (trx) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 120], // ukuran kecil seperti nota kasir
    });

    let y = 10;
    doc.setFontSize(12);
    doc.text("NILU KOPI", 40, y, { align: "center" });
    y += 8;
    doc.setFontSize(8);
    doc.text(`Tanggal: ${trx.date}`, 10, y);
    y += 5;
    doc.text("---------------------------------------", 10, y);
    y += 5;

    trx.items.forEach((item) => {
      doc.text(`${item.name} x${item.qty}`, 10, y);
      y += 4;
      doc.text(`Rp ${item.price.toLocaleString()}`, 10, y);
      y += 6;
    });

    doc.text("---------------------------------------", 10, y);
    y += 5;
    doc.text(`Total: Rp ${trx.total.toLocaleString()}`, 10, y);
    y += 5;
    if (trx.note) {
      doc.text(`Catatan: ${trx.note}`, 10, y);
      y += 5;
    }
    doc.text("---------------------------------------", 10, y);
    y += 8;
    doc.setFontSize(9);
    doc.text("Terima kasih telah berkunjung!", 40, y, { align: "center" });

    doc.save(`struk-${trx.id}.pdf`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-amber-800">Riwayat Transaksi</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-600">Belum ada transaksi.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((trx) => (
            <div
              key={trx.id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg">ID: {trx.id}</h2>
                <p className="text-sm text-gray-500">{trx.date}</p>
                <p className="text-sm mt-2">
                  Total: <span className="font-medium">Rp {trx.total.toLocaleString()}</span>
                </p>
              </div>

              <button
                onClick={() => handleDownload(trx)}
                className="mt-3 md:mt-0 bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition"
              >
                Download Struk
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
