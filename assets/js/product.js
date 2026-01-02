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