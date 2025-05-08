document.addEventListener("DOMContentLoaded", () => {
  const kategoriSelect = document.getElementById("kategori");
  const productContainer = document.getElementById("product-container");
  let semuaProduk = [];

  // Muat kategori
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

  // Muat produk
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      semuaProduk = data.products;
      paparProduk(semuaProduk);
    });

  // Tukar tema
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  });

  // Bila kategori dipilih
  kategoriSelect.addEventListener("change", () => {
    const dipilih = kategoriSelect.value;
    if (dipilih === "semua") {
      paparProduk(semuaProduk);
    } else {
      const tapis = semuaProduk.filter(p => p.kategori === dipilih);
      paparProduk(tapis);
    }
  });

  function paparProduk(list) {
    productContainer.innerHTML = "";
    if (list.length === 0) {
      productContainer.innerHTML = "<p>Tiada produk dijumpai.</p>";
      return;
    }

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.gambar}" alt="${p.nama}">
        <h3>${p.nama}</h3>
        <a href="${p.link}" target="_blank">Beli</a>
      `;
      productContainer.appendChild(card);
    });
  }
});
