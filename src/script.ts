document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById(
    "signup-form"
  ) as HTMLFormElement | null;
  const loginForm = document.getElementById(
    "login-form"
  ) as HTMLFormElement | null;
  const signupContainer = document.getElementById(
    "signup-container"
  ) as HTMLDivElement;
  const loginContainer = document.getElementById(
    "login-container"
  ) as HTMLDivElement;
  const productSection = document.getElementById(
    "product-section"
  ) as HTMLDivElement;
  const productList = document.getElementById("product-list") as HTMLDivElement;
  const loader = document.getElementById("loader") as HTMLDivElement | null;
  const allProductsButton = document.getElementById(
    "all-products"
  ) as HTMLButtonElement;
  const menProductsButton = document.getElementById(
    "men-products"
  ) as HTMLButtonElement;
  const jeweleryButton = document.getElementById(
    "jewelery"
  ) as HTMLButtonElement;
  const electronicsButton = document.getElementById(
    "electronics"
  ) as HTMLButtonElement;
  const womensButton = document.getElementById("womens") as HTMLButtonElement;

  if (signupForm) {
    signupForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      signupContainer.classList.add("hidden");
      productSection.classList.remove("hidden");
      fetchProducts();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      loginContainer.classList.add("hidden");
      productSection.classList.remove("hidden");
      fetchProducts();
    });
  }

  allProductsButton.addEventListener("click", () => {
    fetchProducts();
  });

  menProductsButton.addEventListener("click", () => {
    fetchProducts("men's clothing");
  });

  jeweleryButton.addEventListener("click", () => {
    fetchProducts("jewelery");
  });

  electronicsButton.addEventListener("click", () => {
    fetchProducts("electronics");
  });

  womensButton.addEventListener("click", () => {
    fetchProducts("women's clothing");
  });

  function fetchProducts(category: string = "") {
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url += `/category/${encodeURIComponent(category)}`;
    }
    if (loader) loader.style.display = "block";
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        if (loader) loader.style.display = "none";
        displayProducts(products);
      })
      .catch((error) => {
        if (loader) loader.style.display = "none";
        console.error("Error fetching products:", error);
      });
  }

  function displayProducts(
    products: Array<{
      image: string;
      title: string;
      description: string;
      price: number;
    }>
  ) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;

      const title = document.createElement("h2");
      title.textContent = product.title.slice(0, 10) + "...";

      const description = document.createElement("p");
      description.textContent = product.description.slice(0, 40) + "...";

      const priceContainer = document.createElement("div");
      priceContainer.className = "star";
      const priceLabel = document.createElement("h3");
      priceLabel.textContent = "Summa";
      const price = document.createElement("p");
      price.innerHTML = `<b>-10%</b> ${product.price}$`;

      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "star2";
      const addToCartButton = document.createElement("button");
      addToCartButton.className = "btn1";
      addToCartButton.textContent = "Add to cart";
      const buyNowButton = document.createElement("button");
      buyNowButton.className = "btn2";
      buyNowButton.textContent = "Buy Now";

      priceContainer.appendChild(priceLabel);
      priceContainer.appendChild(price);

      buttonsContainer.appendChild(addToCartButton);
      buttonsContainer.appendChild(buyNowButton);

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(priceContainer);
      card.appendChild(buttonsContainer);

      productList.appendChild(card);
    });
  }
});
