import { getProductById } from "./fetch.js";

async function displayProductDetails(productId) {
  const productDetailContainer = document.getElementById(
    "productDetailContainer"
  );
  const product = await getProductById(productId);

  const card = document.createElement("div");
  card.classList.add("card", "mb-12", "p-4", "m-4");

  card.innerHTML = `
  <div class="row g-0">
  <div class="col-md-12">
      <img src="${product.imageUrl}" class="img-fluid rounded-start" id="divimg" alt="Product Image">
  </div>
  <div class="col-md-8">
      <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Brand: ${product.brand}</p>
          <p class="card-text">Price: ${product.price}</p>
          <button type="button" class="btn btn-primary btn-sm float-end">Vai al Prodotto</button>
      </div>
  </div>
</div> `;
  productDetailContainer.appendChild(card);
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

displayProductDetails(productId);

document
  .getElementById("backToFrontPage")
  .addEventListener("click", function () {
    window.location.href = "frontpage.html";
  });
