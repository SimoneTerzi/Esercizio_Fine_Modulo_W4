import {
  getFetch,
  getProductById,
  addProduct,
  removeProduct,
  updateProduct,
} from "./fetch.js";

async function displayProducts() {
  const productList = await getFetch();
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-12", "p-4", "m-4");

    card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-12">
                    <img src="${product.imageUrl}" class="img-fluid rounded-start" alt="Product Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Brand: ${product.brand}</p>
                        <p class="card-text">Price: ${product.price}</p>
                        <button class="remove-product" data-id="${product._id}">Remove</button>
                        <button class="edit-product" data-id="${product._id}">Edit</button>
                    </div>
                </div>
            </div>
        `;
    productContainer.appendChild(card);
  });

  const removeButtons = document.querySelectorAll(".remove-product");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-id");
      await removeProduct(productId);
      displayProducts();
    });
  });

  const editButtons = document.querySelectorAll(".edit-product");
  editButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-id");
      createModal(productId);
    });
  });
}

async function createModal(productId) {
  const modalContainer = document.querySelector(".modalContainer");
  const product = await getProductById(productId);
  modalContainer.innerHTML = `
    <div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Product</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <h4>Edit Product</h4>

                  <label for="editProductName">Product Name:</label><br>
                  <input type="text" id="editProductName" name="editProductName" value="${product.name}"><br>

                  <label for="editProductDescription">Product Description:</label><br>
                  <textarea id="editProductDescription" name="editProductDescription">${product.description}</textarea><br>

                  <label for="editProductBrand">Product Brand:</label><br>
                  <input type="text" id="editProductBrand" name="editProductBrand" value="${product.brand}"><br>

                  <label for="editProductPrice">Product Price:</label><br>
                  <input type="number" id="editProductPrice" name="editProductPrice" value="${product.price}"><br>

                  <label for="editProductImageUrl">Product Image URL:</label><br>
                  <input type="text" id="editProductImageUrl" name="editProductImageUrl" value="${product.imageUrl}"><br><br>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" id="confirmEdit">Confirm</button>
              </div>
          </div>
      </div>
    </div>`;

  const myModal = new bootstrap.Modal(document.getElementById("editModal"), {
    backdrop: "static",
    keyboard: false,
  });
  myModal.show();

  const confirmButton = document.getElementById("confirmEdit");
  confirmButton.addEventListener("click", async () => {
    const updatedProduct = {
      name: document.getElementById("editProductName").value,
      description: document.getElementById("editProductDescription").value,
      brand: document.getElementById("editProductBrand").value,
      price: parseFloat(document.getElementById("editProductPrice").value),
      imageUrl: document.getElementById("editProductImageUrl").value,
    };

    await updateProduct(productId, updatedProduct);
    displayProducts();
    myModal.hide();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
});

document
  .getElementById("addProductButton")
  .addEventListener("click", async function (event) {
    const productName = document.getElementById("productName").value;
    const productDescription =
      document.getElementById("productDescription").value;
    const productBrand = document.getElementById("productBrand").value;
    const productPrice = parseFloat(
      document.getElementById("productPrice").value
    );
    const productImageUrl = document.getElementById("productImageUrl").value;

    const newProduct = {
      name: productName,
      description: productDescription,
      brand: productBrand,
      price: productPrice,
      imageUrl: productImageUrl,
    };

    await addProduct(newProduct);
    displayProducts();
  });

document.getElementById("goToFrontpage").addEventListener("click", function () {
  window.location.href = "frontpage.html";
});
