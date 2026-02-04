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
  {
    id: 2,
    name: "Camiseta Argentina 1986",
    team: "Selección Argentina",
    price: 69,
    tag: "retro",
    sizes: "S, M, L",
    stock: 7,
    image:
      "https://images.unsplash.com/photo-1508804185872-c57fba7a3f14?auto=format&fit=crop&w=1200&q=80",
    description: "Edición retro con detalles premium y cuello clásico.",
  },
  {
    id: 3,
    name: "Camiseta PSG Tercera 2024",
    team: "Paris Saint-Germain",
    price: 74,
    tag: "nueva",
    sizes: "M, L, XL",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
    description: "Diseño moderno con detalles en dorado.",
  },
  {
    id: 4,
    name: "Camiseta Brasil 2002",
    team: "Selección Brasil",
    price: 64,
    tag: "retro",
    sizes: "S, M, L, XL",
    stock: 9,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    description: "Homenaje a la quinta estrella. Tejido suave y ligero.",
  },
  {
    id: 5,
    name: "Camiseta AC Milan 2023",
    team: "AC Milan",
    price: 59,
    tag: "promocion",
    sizes: "M, L",
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    description: "Promoción por fin de temporada. Stock limitado.",
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
