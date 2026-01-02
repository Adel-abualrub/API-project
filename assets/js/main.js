const getProducts=async()=>{
const response =await axios.get('https://dummyjson.com/products?limit=12')

return response.data;


}
getProducts();
const displaydata= async()=>{
    try{
const result= await getProducts();
const Products=result.products.map((product)=>{
return `

    <div class="col-12 col-sm-6 col-lg-3 ">
      <div class="card product-card h-100">
        <img
          src="${product.thumbnail}"
          class="card-img-top product-img"
          alt="Product"
        >

        <div class="card-body d-flex flex-column product-body">
          <h5 class="product-title">${product.title}</h5>
          <span class="product-price">${product.price}$</span>

          <div class="product-actions d-flex">
            <a href="#" class="btn btn-primary product-buy">Order Now</a>
            <a href="#" class="btn btn-primary product-details">Details</a>
          </div>
        </div>
      </div>
    </div>

`


} ).join(" ")

document.querySelector(".products .row ").innerHTML=Products;}
catch (error) {
  document.querySelector(".products").innerHTML = `
  <div class="error-overlay">
    <div class="error-popup card text-center p-4">
      <h4 class="mb-3 text-danger">Unable to Load Products</h4>

      <p class="text-muted mb-4">
        Something went wrong while fetching the data.<br>
        Please try again in a moment.
      </p>

      <button class="btn btn-danger px-4" onclick="displaydata()">
        Try Again
      </button>
    </div>
  </div>
`;

}


}
displaydata();
