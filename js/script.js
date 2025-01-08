/** Product */
let allProductsArr = [];
let productContainer = document.getElementById("productContainer");
let counter = document.getElementById("counter");

/** Handle First Products */
let localProducts = localStorage.getItem("allProductsArr");
if (localProducts) {
  allProductsArr = JSON.parse(localProducts);
  console.log(allProductsArr);
  displayProducts();
}

/** R ==>> Retrieve */
function displayProducts() {
  let productsContainer = "";
  for (let i = 0; i < allProductsArr.length; i++) {
    let randomOffers = Math.ceil(Math.random() * 20);
    productsContainer += `
          <div class="col-md-4 col-lg-3 position-relative mt-5">
          <span class="position-absolute top-0 end-0 m-4 bg-danger badge z-1">-${randomOffers}%</span>
            <div class="h-100 ">
              <div class="card h-100 text-white cardShow fw-bolder" style="background-color: #604cf8;">
                <figure class="mb-0">
                  <img class="card-img-top object-fit-cover" height="250px" src="images/${allProductsArr[i].Image}" alt="${allProductsArr[i].Name}" />
                </figure>
                <div class="card-header">
                  <div class="card-title">${allProductsArr[i].Name}</div>
                </div>
                <div class="card-body">
                  <div class="card-text">
                    <p>${allProductsArr[i].Category}</p>
                    <p>${allProductsArr[i].Description}</p>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                  <p class="mb-0">${allProductsArr[i].Price} L.E</p>
                  <div>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-regular fa-star-half-stroke text-warning"></i>
                  </div>
                  </div>
                  <div class="my-2 text-center">
                  <button class="btn btn-success">Add to Cart</button>
                  <button class="btn btn-danger"><i class="fa-solid fa-heart"></i></button>
                  </div>
              </div>
            </div>
          </div>
    `;
  }
  productContainer.innerHTML = productsContainer;
  counter.innerHTML = allProductsArr.length;
}
