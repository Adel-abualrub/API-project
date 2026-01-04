const limit = 8;

const getCategories = async () => {
  const response = await axios.get("https://dummyjson.com/products/categories");
  console.log(response.data);
  return response.data;
};

const displayCategories = async () => {
  try {
    const categories = await getCategories();
    const result = categories
      .map((categorie) => {
        return `
  <li><a class="dropdown-item" href="./categories.html?category=${categorie.slug}">${categorie.name}</a></li>
`;
      })
      .join("");
    document.querySelector(".categories").innerHTML = result;
  } catch (error) {
    document.querySelector(".products").innerHTML = `
  <div class="error-overlay">
    <div class="error-popup card text-center p-4">
      <h4 class="mb-3 text-danger">Unable to Load Products</h4>

      <p class="text-muted mb-4">
        Something went wrong while fetching the data.<br>
        Please try again in a moment.
      </p>

      <button class="btn btn-danger px-4" onclick="displayProducts()">
        Try Again
      </button>
    </div>
  </div>
`;
  }
};
displayCategories();

const getProductByCategories = async (order = "asc", page) => {
  const totalSkip = (page - 1) * limit;
  const params = new URLSearchParams(location.search);
  const categorie = params.get("category");
  let response;

  response = await axios.get(
    `https://dummyjson.com/products/category/${categorie}?sortBy=price&order=${order}&skip=${totalSkip}&limit=${limit}`
  );

  return response.data;
};

const displayAllCategoriesProducts = async (page = 1) => {
  try{
  const sortby = document.querySelector("#priceSort");
  const Products = await getProductByCategories(sortby.value, page);

  const result = Products.products
    .map((Pr) => {
      return `

    <div class="col-12 col-sm-6 col-lg-3 ">
      <div class="card product-card h-100">
        <img
          src="${Pr.thumbnail}"
          class="card-img-top product-img"
          alt="Product"
        >

        <div class="card-body d-flex flex-column product-body">
          <h5 class="product-title">${Pr.title}</h5>
          <span class="product-price">${Pr.price}$</span>

         <div class="product-actions d-flex">
            <a href="#" class="btn btn-primary product-buy">Order Now</a>
            <a href="./product.html?id=${Pr.id}" class="btn btn-outline-danger product-details">Details</a>
          </div>
        </div>
      </div>
    </div>

    

`;
    })
    .join("");

  document.querySelector(".products").innerHTML = result;

  sortby.addEventListener("change", async () => {
    const Products = await getProductByCategories(sortby.value,page);
    const result = Products.products
      .map((Pr) => {
        return `

    <div class="col-12 col-sm-6 col-lg-3 ">
      <div class="card product-card h-100">
        <img
          src="${Pr.thumbnail}"
          class="card-img-top product-img"
          alt="Product"
        >

        <div class="card-body d-flex flex-column product-body">
          <h5 class="product-title">${Pr.title}</h5>
          <span class="product-price">${Pr.price}$</span>

         <div class="product-actions d-flex">
            <a href="#" class="btn btn-primary product-buy">Order Now</a>
            <a href="./product.html?id=${Pr.id}" class="btn btn-outline-danger product-details">Details</a>
          </div>
        </div>
      </div>
    </div>

`;
      })
      .join("");
    document.querySelector(".products").innerHTML = result;
  });

  /*  pagination code*/
  const params = new URLSearchParams(location.search);
  const categorie = params.get("category");
  const totalPages = Math.ceil(Products.total / limit);
  let Pagination = ``;

  if (Products.total > limit) {
    if (page > 1) {
      Pagination = `<button  class="BTN"  onclick=displayAllCategoriesProducts(${
        page - 1
      })>  <span class="page-link">&laquo;</span> </button>`;
    }
    for (let i = 1; i <= totalPages; i++) {
      Pagination += `<button class="BTN"   class="pagbtn " pagbtn   onclick=displayAllCategoriesProducts(${i})> <span class="page-link">${i}</span> </button>`;
    }

    if (page < totalPages) {
      Pagination += `<button class="BTN"  onclick=displayAllCategoriesProducts(${
        page + 1
      })>  <span class="page-link">&raquo;</span> </button>`;
    }
  }
  document.querySelector(".pagination").innerHTML = Pagination;
  /*end pagination code*/
  }
  
    
catch (error) {
  document.querySelector(".products").innerHTML = `
  <div class="error-overlay">
    <div class="error-popup card text-center p-4">
      <h4 class="mb-3 text-danger">Unable to Load Products</h4>

      <p class="text-muted mb-4">
        Something went wrong while fetching the data.<br>
        Please try again in a moment.
      </p>

      <button class="btn btn-danger px-4" onclick="displayProducts()">
        Try Again
      </button>
    </div>
  </div>
`;

}
  
  
};
displayAllCategoriesProducts();
