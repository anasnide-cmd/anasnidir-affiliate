document.addEventListener("DOMContentLoaded", () => {
  const kategoriSelect = document.getElementById("kategori");
  const productContainer = document.getElementById("product-container");
  let semuaProduk = [];

  // Load kategori
  fetch("data/categories.json")
    .then(res => res.json())
    .then(data => {
      kategoriSelect.innerHTML = '<option value="semua">Semua Kategori</option>';
      data.categories.forEach(kategori => {
        const opt = document.createElement("option");
        opt.value = kategori;
        opt.textContent = kategori;
        kategoriSelect.appendChild(opt);
      });
    });

  // Load produk
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      semuaProduk = data.products;
      paparProduk(semuaProduk);
    });

  // Tukar tema
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Bila kategori berubah
  kategoriSelect.addEventListener("change", () => {
    const kategoriDipilih = kategoriSelect.value;
    if (kategoriDipilih === "semua") {
      paparProduk(semuaProduk);
    } else {
      const tapisProduk = semuaProduk.filter(p => p.kategori === kategoriDipilih);
      paparProduk(tapisProduk);
    }
  });

  function paparProduk(produkList) {
    productContainer.innerHTML = "";
    if (produkList.length === 0) {
      productContainer.innerHTML = "<p>Tiada produk dalam kategori ini.</p>";
      return;
    }
    produkList.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.gambar}" alt="${p.nama}" />
        <h3>${p.nama}</h3>
        <a href="${p.link}" class="btn" target="_blank">Beli Sekarang</a>
      `;
      productContainer.appendChild(card);
    });
  }
});
