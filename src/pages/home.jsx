import React from "react";
import MenuCard from "../components/menuCard";
import { useCart } from "../context/CartContext"; // <— tambahkan ini
import nasiGoreng from "../assets/img/nasiGoreng.jpg";
import kopiHitam from "../assets/img/kopiHitam.jpg";
import paketHemat from "../assets/img/paketHemat.jpg";

export default function Home() {
  const { addToCart } = useCart(); // <— ambil fungsi addToCart

  const rekomendasi = [
    { 
      id: 1, name: "Nasi Goreng Spesial",
      price: 25000, 
      img: nasiGoreng,
      category : "food",
      quantity: 1,

  },
  {
     id: 2,
     name: "Ayam Pokpok Matah",
     price: 15000,
     img: "https://modernmealmakeover.com/wp-content/uploads/2020/10/IMG_6548-4.jpg",
     category : "food",
     quantity: 1,
    
  },
    {id: 3, name: "Ayam Bakar Madu", price: 15000, img: "https://cdn-brilio-net.akamaized.net/news/2019/10/22/172646/1114926-1000xauto-14-resep-cara-membuat-ayam-bakar.jpg",category : "food",
     quantity: 1,},
    {id: 4, name: "Burger Blast", price: 15000, img: "https://img.delicious.com.au/9d27SNl7/del/2022/10/p89-salt-and-vinegar-crumbed-chicken-burger-176377-1.png", category : "food",
     quantity: 1,},
    {id: 5, name: "Ayam Cabe Garam", price:20000, img: "https://dcostseafood.id/wp-content/uploads/2021/12/Nasi-ayam-fillet-cabe-garam.jpg", category : "food",
     quantity: 1,},
    {id: 6, name: "Spagheti Bolognese", price:2000, img: "https://www.cookingclassy.com/wp-content/uploads/2018/08/bolognese-4.jpg", category : "food",
     quantity: 1,}


  ];

  const makanan = [
    { id: 5, name: "Ayam Bakar Madu", price: 20000, img: "https://cdn-brilio-net.akamaized.net/news/2019/10/22/172646/1114926-1000xauto-14-resep-cara-membuat-ayam-bakar.jpg" , category : "food",
     quantity: 1,},
    { id: 6, name: "Ayam Goreng Terasi", price: 22000, img: "https://dcostseafood.id/wp-content/uploads/2024/07/Nasi-ayam-goreng-kremes.jpg" , category : "food",
     quantity: 1,},
    { id: 7, name: "Ayam Rice Bowl", price: 22000, img: "https://modernmealmakeover.com/wp-content/uploads/2020/10/IMG_6548-4.jpg" , category : "food",
     quantity: 1,},
    { id: 8, name: "Spaghetti Carbonara", price: 22000, img: "https://www.thespruceeats.com/thmb/ovIQQQxQajADuIE2lqhgqq7ppyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pasta-carbonara-recipe-5210168-hero-01-80090e56abc04ca19d88ebf7fad1d157.jpg", category : "food",
     quantity: 1, },
    { id: 9, name: "Spaghetti Bolognese", price: 22000, img: "https://www.cookingclassy.com/wp-content/uploads/2018/08/bolognese-4.jpg", category : "food",
     quantity: 1,},
    { id: 10, name: "Rice & Wings", price: 22000, img: "https://www.butterbeready.com/wp-content/uploads/2023/06/DK6A2552-680x1020.jpg", category : "food",
     quantity: 1, },
  ];

  const minuman = [
    { id: 11, name: "Es Teh Manis", price: 5000, img: "https://franchisebisniskost.com/wp-content/uploads/2025/02/Franchise-Es-Teh.png" ,category : "drink",
     quantity: 1, },
    { id: 12, name: "Coffe Latte", price: 18000, img: "https://brookrest.com/wp-content/uploads/2020/05/AdobeStock_315919556-scaled.jpeg",category : "drink",
     quantity: 1, }, 
    { id: 13, name: "Cappucino", price: 18000, img: "http://www.ffactor.com/wp-content/uploads/2018/08/AdobeStock_202756131.jpeg", category : "drink",
     quantity: 1, },
    { id: 14, name: "Redvelvet", price: 18000, img: "https://coffeeland.co.id/wp-content/uploads/2018/10/Red_v_hot_cold_Mbassy_1024x1024.png",category : "drink",
     quantity: 1, },
    { id: 15, name: "Matcha", price: 18000, img: "https://thinkmilkbesmart.eu/wp-content/uploads/2022/12/matcha-latte.jpg", category : "drink",
     quantity: 1, },
    { id: 16, name: "Butterscoth Latte", price: 18000, img: "https://www.aeki-aice.org/wp-content/uploads/2025/03/Butterscotch-Coffee.jpeg",category : "drink",
     quantity: 1, },
  ];

  const paket = [
    { id: 17, name: "Paket Nilu Kampus", price: 25000, img: "https://imgx.parapuan.co/crop/0x0:0x0/945x630/photo/2022/09/17/persediaan-makanan-dan-minuman-s-20220917035901.jpg" },
    { id: 18, name: "Paket Nilu Sarjana", price: 30000, img: "https://i0.wp.com/www.itrip.id/wp-content/uploads/2019/12/Minuman-Makanan-Khas-Manado.jpg" },
    { id: 19, name: "Paket Nilu Mahasiswa", price: 25000, img: "https://1.bp.blogspot.com/-hdzJZTQU8Y8/XovTD4iDzfI/AAAAAAAACVY/2IvYc5LzILw78-dk-0tzdrGnurw-j9wXwCLcBGAsYHQ/s1600/gado%2Bgado.jpg" },
    { id: 20, name: "Paket Nilu Keluarga", price: 50000, img: "https://storage.googleapis.com/fastwork-static/edbcf64b-3f7e-47eb-9d33-4e5397b6d1f9.jpg" },
    { id: 21, name: "Paket Nilu Pasangan", price: 40000, img: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/07/16074631/Daftar-Makanan-Enak-Asal-Indonesia-yang-Mendunia.jpg" },
    { id: 22, name: "Paket Nilu Jomblo", price: 21000, img: "https://cdn-image.hipwee.com/wp-content/uploads/2014/05/IMG_4127.jpg" },
  ];

  const seasonal = [
    { id: 23, name: "Sushilu", price: 24000, img: "https://www.timeoutriyadh.com/cloud/timeoutriyadh/2023/09/19/roka-seasonal-menu-yellowtail-maki.jpg" },
    { id: 24, name: "Burger Blast", price: 28000, img: "https://img.delicious.com.au/4P8g_XLF/del/2022/02/vibrant-chickpea-burgers-163338-2.jpg" },
    { id: 25, name: "Hotdog Blast", price: 28000, img: "https://tse2.mm.bing.net/th/id/OIP.V8uYS7XIMiZ3z1ebBLt3EAHaE0?pid=Api&P=0&h=180" },
    { id: 26, name: "Sego Pecel", price: 19000, img: "https://thumbs.dreamstime.com/b/traditional-indonesian-culinary-nasi-pecel-nasi-pecel-served-peanut-sauce-rice-delicious-tradtional-food-121308933.jpg" },
    { id: 27, name: "Garang Asem", price: 26000, img: "https://asset.kompas.com/crops/BYfDDOuMBFY7Usf3LDCXkoCQ6kY=/0x0:1000x667/750x500/data/photo/2021/05/30/60b2de1ed72be.jpg" },
    { id: 28, name: "Ayam Bakar Jawa", price: 22000, img: "https://cdn.idntimes.com/content-images/community/2022/02/cara-membuat-ayam-bakar-empuk-bumbu-meresap-resep-ayam-bakar-empuk-resep-baceman-ayam-9cde86371d7fc78c91ae80a6ffab250e-4146dd47f176123763028518fe5664b0.jpg" },
  ];

  const sections = [
    { id: "rekomendasi", title: "Menu Rekomendasi", data: rekomendasi },
    { id: "makanan", title: "Makanan", data: makanan },
    { id: "minuman", title: "Minuman", data: minuman },
    { id: "paket", title: "Paket Makanan", data: paket },
    { id: "seasonal", title: "Seasonal Menu", data: seasonal },
  ];

  const scrollToMenu = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans">
      {/* Landing Section */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-white text-center relative">
        <img
          src="../src/img/nilu.png" // ubah ke logo kamu
          alt="Nilu Logo"
          className="w-50 h-25 mb-9"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang di Nilu Coffee
        </h1>
        <p className="text-gray-600 mb-6">
          Nikmati kehangatan cita rasa kopi & makanan terbaik kami
        </p>
        <button
          onClick={() => scrollToMenu("rekomendasi")}
          className="bg-blue-950 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition"
        >
          Lihat Menu Rekomendasi
        </button>
      </section>

      {/* Semua Menu */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="py-12 px-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {section.data.map((menu) => (
              <MenuCard key={menu.id} menu={menu} onAddToCart={() => addToCart(menu)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
