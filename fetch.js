const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI0ZmFhNzM4MjY2NTAwMTljNzEwOTkiLCJpYXQiOjE3MDY0NTA5MTEsImV4cCI6MTcwNzY2MDUxMX0.-bBUxgdNO2qW31m9dPoF_8mMcgCqME96gEJD0D8-M1M";
const url = "https://striveschool-api.herokuapp.com/api/product/";

export async function getFetch() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    alert("Error fetching products. Please try again later.");
  }
}

export async function removeProduct(productId) {
  try {
    const response = await fetch(url + productId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error removing product:", error.message);
    alert("Error removing product. Please try again later.");
  }
}

export async function addProduct(product) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Prodotto aggiunto con successo!");
  } catch (error) {
    console.error(
      "Si è verificato un errore durante il caricamento del prodotto:",
      error
    );
    alert(
      "Si è verificato un errore durante il caricamento del prodotto. Riprova più tardi."
    );
  }
}

export async function getProductById(productId) {
  try {
    const response = await fetch(`${url}/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error.message);
    alert("Error fetching product details. Please try again later.");
  }
}
