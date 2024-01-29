import { getFetch } from "./fetch.js";

async function displayProducts() {
  const productList = await getFetch();
  const productContainer = document.getElementById("productContainer");

  productList.forEach((product) => {
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
                <button type="button" class="btn btn-primary btn-sm float-end" data-id="${product._id}">Vai al Prodotto</button>
            </div>
        </div>
    </div> `;
    productContainer.appendChild(card);
  });
}

displayProducts();

function handleViewProductClick(productId) {
  window.location.href = `ProductPage.html?id=${productId}`;
}

document
  .getElementById("productContainer")
  .addEventListener("click", function (event) {
    if (event.target && event.target.matches("button.btn-primary")) {
      const productId = event.target.getAttribute("data-id");
      handleViewProductClick(productId);
    }
  });
