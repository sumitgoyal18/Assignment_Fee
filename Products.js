const addbtn = document.getElementById("add");
const form = document.getElementById("postForm");
const imageUrl = document.getElementById("imageUrl");
const description = document.getElementById("description");
const rate = document.getElementById("rate");
const stock=document.getElementById("stock");
const layout = document.getElementById("right");
const deletebtn = document.getElementsByClassName("delete");


loadpage();

function loadpage(){
    document.addEventListener("DOMContentLoaded",loadproduct);
    
    addbtn.addEventListener("click",formappear);
    
    form.addEventListener("submit",(e)=>{
        addproduct(e);
        formdisappear();
    });

    layout.addEventListener("click",(e)=>{
        deleteproduct(e);
    });
}

function loadproduct(){
    let products;
    if (localStorage.getItem("products")===null) {
        products = [{
            Url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvISWV--yWSsHVx9MeoMlK8a_iawaZDX9Bg&usqp=CAU",
            desc: "I-Tablet",
            price: "1200",
            stock: "25"
        }];
    }
    else{
        products = JSON.parse(localStorage.getItem("products"));
    }
    products.forEach((product)=>{
        addlisting(product.Url,product.desc,product.price,product.stock)
    })
}

function addproduct(e){
    e.preventDefault();
    console.log("HELLO");
    addlisting(imageUrl.value,description.value,rate.value,stock.value);
    storagetogo(imageUrl.value,description.value,rate.value,stock.value);
    imageUrl.value = '';
    description.value = '';
    rate.value = '';
    formdisappear;
}

function addlisting(Url,desc,price,stock){
    const productadd = document.createElement("div");
    productadd.className = "gridItem";
    productadd.innerHTML = `
    <div class="product">
                        <div>
                            <img src=${Url} alt="">
                        </div>
                        <div class="description">
                            <p>${desc}</p>
                        </div>
                        <div class="rate">
                            <p>\u20B9<span>${price}</span>/-</p>
                        </div>
                        <div class="stock">
                            <p>Stock Available:<span>${stock}</span></p>
                        </div>
                        <div class="delete">
                            <i class="fa-solid fa-trash" style="color: #b42222;"></i>
                        </div>
                    </div>
    `;
    layout.prepend(productadd);
}

function storagetogo(Url,desc,price,stock){
    let products;
    if (localStorage.getItem('products') == null) {
        products = [];
    }
    else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.push({Url,desc,price,stock});

    localStorage.setItem('products',JSON.stringify(products));
    console.log("done");
}

function formappear(){
    let displayform = document.getElementById("overlayForm");
    let background = document.getElementsByClassName("overlayBackground");
    displayform.style.display = "flex";
    background[0].addEventListener("click",()=>{
        displayform.style.display = "none";
    });
}

function formdisappear(){
    let displayform = document.getElementById("overlayForm");
    displayform.style.display = "none";
}

function deleteproduct(e){
    if (e.target.parentElement.parentElement.parentElement.classList.contains("gridItem")) {
        if (confirm("Are you sure you want")) {
            e.target.parentElement.parentElement.parentElement.remove();
            let productUrl = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.src;
            let descrip = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.innerText;
            let rate = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.innerText;
            let stocks= e.target.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText;
            removefromstorage(productUrl,descrip,rate,stocks);
        }
    }
}

function removefromstorage(productUrl,descrip,rate,stocks) {
    let products = JSON.parse(localStorage.getItem('products'));
    let index = -1;

    products.forEach((product, i) => {
        if (productUrl == product.Url && descrip == product.desc && rate == product.price && product.stock==stocks) {
            index = i;
        }
    });
    console.log(index);
    if (index > -1) {
        products.splice(index, 1);
    }

    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}