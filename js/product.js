/** Product Inputs */
let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productImageInput = document.getElementById("productImage");
let productDescriptionInput = document.getElementById("productDescription");

/** Form Buttons */
let addProductBtn = document.getElementById("addProductBtn");
let updateProductBtn = document.getElementById("updateProductBtn");

/** Form Buttons Events */
addProductBtn.addEventListener("click", () => {
  createProduct();
});

/** Product */
let allProductsArr = [];
let tableBody = document.getElementById("tableBody");
let currentUpdateProduct;
let isUpdated = false;

/** Handle First Products */
let localProducts = localStorage.getItem("allProductsArr");
if (localProducts) {
  allProductsArr = JSON.parse(localProducts);
  displayProducts();
}

/** C ==>> Create */
function createProduct() {
  let product = {
    Name: productNameInput.value,
    Price: productPriceInput.value,
    Category: productCategoryInput.value,
    Image: productImageInput.files[0]?.name || "6.jpg",
    Description: productDescriptionInput.value,
  };
  addProduct(product);
  showSuccessMessage("Product Added Successfully!");
}

 function addProduct(product) {
  allProductsArr.push(product);
  updateLocalStorage();
  displayProducts();
  cleItems()
}

/** R ==>> Retrieve */
function displayProducts() {
  let productsContainer = "";
  for (let i = 0; i < allProductsArr.length; i++) {
    productsContainer += `
                <tr>
                  <td>${i + 1}</td>
                  <td>${allProductsArr[i].Name}</td>
                  <td>${allProductsArr[i].Price} L.E</td>
                  <td>${allProductsArr[i].Category}</td>
                  <td><img src="../images/${allProductsArr[i].Image}" role="presentation" /></td>
                  <td>${allProductsArr[i].Description}</td>
                  <td>
                    <div class="d-flex gap-1">
                      <button onclick="deleteProduct(${allProductsArr.indexOf(
                        allProductsArr[i]
                      )})" class="btn btn-outline-danger"><i class="fa-solid fa-trash fs-5"></i></button>
                      <button onclick="onUpdateClick(${allProductsArr.indexOf(
                        allProductsArr[i]
                      )})" class="btn btn-outline-warning"><i class="fa-regular fa-pen-to-square fs-5"></i></button>
                    </div>
                  </td>
                </tr>
    `;
  }
  tableBody.innerHTML = productsContainer;
}

/** U ==>> Update */
 function onUpdateClick(index) {
  isUpdated = true;
  toggleFormButton(); // toggle buttons

  currentUpdateProduct = index;
  let currentElement = allProductsArr[index];
  productNameInput.value = currentElement.Name;
  productPriceInput.value = currentElement.Price;
  productCategoryInput.value = currentElement.Category;
  productDescriptionInput.value = currentElement.Description;
}

 function updateProducts() {
  isUpdated = false;
  let currentElementImage = allProductsArr[currentUpdateProduct].Image;
  let product = {
    Name: productNameInput.value,
    Price: productPriceInput.value,
    Category: productCategoryInput.value,
    Image: productImageInput.files[0]?.name || currentElementImage,
    Description: productDescriptionInput.value,
  };

  allProductsArr.splice(currentUpdateProduct, 1, product);
  updateLocalStorage(); // update local storage
  displayProducts(); // display products
  showSuccessMessage("Product Updated Successfully!"); // show updated message
  toggleFormButton(); // toggle buttons
  cleItems()
}

/** D ==>> Delete */
function deleteProduct(index) {
  allProductsArr.splice(index, 1);
  displayProducts();
  updateLocalStorage();
  showSuccessMessage("Product Deleted Successfully!");
  updateProductBtn.classList.add("d-none");

}

/** Handle Success Message */
function showSuccessMessage(message) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

/** Handle Local Storage */
function updateLocalStorage() {
  localStorage.setItem("allProductsArr", JSON.stringify(allProductsArr));
}

/** Handle Form Inputs */
function toggleFormButton() {
  if (isUpdated) {
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.remove("d-none");
  } else {
    addProductBtn.classList.remove("d-none");
    updateProductBtn.classList.add("d-none");
  }
}

/** Handle Search */
function startSearch(e) {
  let productsContainer = "";
  for (let i = 0; i < allProductsArr.length; i++) {
    if (allProductsArr[i].Name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase())) {
      productsContainer += `
                <tr>
                  <td>${i + 1}</td>
                  <td>${allProductsArr[i].Name.replaceAll(
                    new RegExp(e.value, "ig"),
                    (match) => `<span class="text-danger">${match}</span>`
                  )}</td>
                  <td>${allProductsArr[i].Price} L.E</td>
                  <td>${allProductsArr[i].Category}</td>
                  <td><img src="../images/${allProductsArr[i].Image}" role="presentation" /></td>
                  <td>${allProductsArr[i].Description}</td>
                  <td>
                    <div class="d-flex gap-1">
                      <button onclick="deleteProduct(${allProductsArr.indexOf(
                        allProductsArr[i]
                      )})" class="btn btn-outline-danger"><i class="fa-solid fa-trash fs-5"></i></button>
                      <button onclick="onUpdateClick(${allProductsArr.indexOf(
                        allProductsArr[i]
                      )})" class="btn btn-outline-warning"><i class="fa-regular fa-pen-to-square fs-5"></i></button>
                    </div>
                  </td>
                </tr>
    `;
    }
  }
  tableBody.innerHTML = productsContainer;
}

function cleItems(){
  productNameInput.value = null
  productPriceInput.value = null
  productCategoryInput.value = null
  productDescriptionInput.value = null
}