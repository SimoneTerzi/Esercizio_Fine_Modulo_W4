import {
  getFetch,
  getProductById,
  addProduct,
  removeProduct,
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

displayProducts();

async function createModal(productId) {
  const modalContainer = document.querySelector(".modalContainer");
  const product = await getProductById(productId);
  modalContainer.innerHTML = "";
  modalContainer.innerHTML = `<div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <h4>Modifica Prodotto</h4>

              Nome del Prodotto: <br>
              <input type="text" id="productName" name="productName" value="${product.name}"><br>

              Descrizione del Prodotto: <br>
              <textarea id="productDescription" name="productDescription">${product.description}</textarea><br>

              Marca del Prodotto: <br>
              <input type="text" id="productBrand" name="productBrand" value="${product.brand}"><br>

              Prezzo del Prodotto: <br>
              <input type="number" id="productPrice" name="productPrice" value="${product.price}"><br>

              URL dell'immagine del Prodotto: <br>
              <input type="text" id="productImageUrl" name="productImageUrl" value="${product.imageUrl}"><br><br>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary"  data-bs-dismiss="modal">Confirm</button>
          </div>
      </div>
  </div>
</div>`;
  const modalfade = document.getElementById("editModal");
  const myModal = new bootstrap.Modal(modalfade);
  myModal.show();
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
