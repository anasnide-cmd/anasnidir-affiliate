// Load kategori dari JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/categories.json")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("kategori");
      select.innerHTML = '<option selected disabled>Pilih kategori produk</option>';
      data.categories.forEach((item) => {
        const opt = document.createElement("option");
        opt.textContent = item;
        select.appendChild(opt);
      });
    });

  // Theme toggle
  const toggleBtn = document.getElementById("theme-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
