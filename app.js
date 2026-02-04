const defaultProducts = [
  {
    id: 1,
    name: "Camiseta Real Madrid 2024",
    team: "Real Madrid",
    price: 79,
    tag: "nueva",
    sizes: "S, M, L, XL",
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
    description: "Versión player con tejido transpirable y escudo bordado.",
  },
];

const productGrid = document.getElementById("product-grid");
const productForm = document.getElementById("product-form");
const filterButtons = document.querySelectorAll(".filter");

const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
let products = storedProducts.length ? storedProducts : defaultProducts;
let currentFilter = "todas";

const tagLabels = {
  nueva: "Nueva temporada",
  retro: "Retro",
  promocion: "Promoción",
};

const formatPrice = (value) => `€${value}`;

const renderProducts = () => {
  const filtered =
    currentFilter === "todas"
      ? products
      : products.filter((product) => product.tag === currentFilter);

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-body">
            <div class="product-meta">
              <span>${formatPrice(product.price)}</span>
              <span class="tag">${tagLabels[product.tag] || product.tag}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description || "Sin descripción"}</p>
            <p><strong>Equipo:</strong> ${product.team}</p>
            <p><strong>Tallas:</strong> ${product.sizes}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
          </div>
        </article>
      `,
    )
    .join("");
};

const persistProducts = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderProducts();
  });
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(productForm);
  const newProduct = {
    id: Date.now(),
    name: formData.get("name"),
    team: formData.get("team"),
    price: Number(formData.get("price")),
    tag: formData.get("tag"),
    sizes: formData.get("sizes"),
    stock: Number(formData.get("stock")),
    image: formData.get("image"),
    description: formData.get("description"),
  };

  products = [newProduct, ...products];
  persistProducts();
  productForm.reset();
  currentFilter = "todas";
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  document.querySelector('.filter[data-filter="todas"]').classList.add("active");
  renderProducts();
  productForm.scrollIntoView({ behavior: "smooth", block: "center" });
});

renderProducts();
