
  
const products=[];
const rowsPerPage = 10;
let currentPage = 1;
const tableBody=document.getElementById("productTable").getElementsByTagName("tbody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");
for(let i=0;i<25;i++){
    products.push({
        image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/headphone/e/j/6/quietcomfort-wireless-noise-cancelling-headphones-bose-original-imagvshaddeftnpy.jpeg?q=90&crop=false" + (i + 1),
        name: "Product " + (i + 1),
        price: "$" + (10 + i * 2),
        description: "This is a short description of product " + (i + 1),
      });
}

function renderTable() {
    const start=(currentPage-1)*rowsPerPage;
    const end=start+rowsPerPage;
    const pageItems=products.slice(start,end);
    tableBody[0].innerHTML="";
    for(const prod of pageItems){
        const row=document.createElement("tr");
        row.innerHTML=`
        <td><img src="${prod.image}" alt="${prod.name}" /></td>
        <td>${prod.name}</td>
        <td>${prod.price}</td>
        <td>${prod.description}</td>
        `;
        tableBody[0].appendChild(row);
    }
    pageIndicator.innerHTML=`Page ${currentPage} of ${Math.ceil(products.length/rowsPerPage)}`;

}

prevBtn.addEventListener("click",()=>{
    if(currentPage>1){
        currentPage--;
        renderTable();
    }
})

nextBtn.addEventListener("click",()=>{
    if(currentPage<Math.ceil(products.length/rowsPerPage)){
        currentPage++;
        renderTable();
    }
})

renderTable();