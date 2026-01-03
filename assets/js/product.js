const getproduct = async()=>{

  const parms= new URLSearchParams(location.search);
  const id=parms.get("id");

const Product= await axios.get(`https://dummyjson.com/products/${id}`);
console.log(Product);
return Product.data;
}
getproduct();


const displayProductInfo=async ()=>{
 const result= await getproduct();
const productHTML = `
  <div class="col-12 col-md-6">
    <div class="product-image-box">
      <img 
        src="${result.thumbnail}"
        alt="${result.title}"
        class="img-fluid"
      >
    </div>
  </div>

  <div class="col-12 col-md-6">
    <div class="product-info">

      <span class="product-category">
        ${result.category}
      </span>

      <h1 class="product-title">
        ${result.title}
      </h1>

      <div class="product-rating">
        ⭐ ${result.rating}
      </div>

      <div class="product-price">
        $${result.price}
        <span class="product-discount">
          -${result.discountPercentage}%
        </span>
      </div>

      <p class="product-description">
        ${result.description}
      </p>

      <div class="product-stock">
        ${result.availabilityStatus}: <strong>${result.stock}</strong>
      </div>

      <div class="product-actions mt-4">
        <button class="btn btn-primary btn-lg">Buy Now</button>
      </div>

    </div>
  </div>
`;
document.querySelector(".product").innerHTML=productHTML;

}
displayProductInfo();
const getCategories=async()=>{
const response= await axios.get('https://dummyjson.com/products/categories');
console.log(response.data);
return response.data;

}

const displayCategories= async()=>{

try {
const categories=await getCategories();
const result= categories.map((categorie)=>{
return`
  <li><a class="dropdown-item" href="./categories.html?category=${categorie.slug}">${categorie.name}</a></li>
`

}).join("");
document.querySelector(".categories").innerHTML = result;

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
}
displayCategories();