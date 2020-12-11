let addToCart = document.querySelectorAll('.shopping-cart__collections');
let add = document.getElementById('add');
let cartButton = document.getElementById('Cart-btn');
let countCart = document.getElementById('count');
let form = '';
let buyForm=document.getElementById('buy-product')
let orders = '';
let storedArray = []
let count = 0;
let orderedItems;
let total = []
let myform = document.getElementById("product");
let imageInfo = document.getElementById('product-details');

window.onload = () => {
    document.getElementById("myform").style.display = "none";
    document.getElementById('getImageDetails').style.display = "none";
    document.getElementById("buy-product").style.display = "none";
    document.getElementById('ordered').style.display = "none";
}

function closeOrder() {
    document.getElementById('ordered').style.display = "none"
}

const openCart = () => document.getElementById("myform").style.display = "block";
const closeForm = () => document.getElementById("myform").style.display = "none";

const resturnObject = (id, price,image) => ({ code: id, price: price ,image:image})
const orderedProduct = (item) => {
    document.getElementById('ordered').style.display = "block";
     item.forEach(item => {
        orders +=  `<div class="orderPlaced">
            <span>Product Name - ${item.name}</span>
            <span>Mobile Number - ${item.mobile}</span>
            <span>Nearest City - ${item.city}</span>
            <span>Pin Code - ${item.pinCode}</span>
        </div>
        `
    })
    OrderInfo.innerHTML = orders
}

function formSubmit() {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let mobile = document.getElementById('mobile').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let number = document.getElementById('number').value;
    if(name.trim() && mobile.trim() && address.trim() && city.trim() && number.trim()) {
        orderedItems = ({name: name, mobile: mobile, city: city, pinCode: number})
       
        total.push(orderedItems);
        console.log(total)
    }
    document.getElementById('buy-product').style.display = "none";
    orderedProduct(total);
}

const getDetails = (id, price,image) => {
    document.getElementById("myform").style.display = "none";
    count += 1;
    let cart = '';
    countCart.innerHTML = count;
    let result = resturnObject(id, price,image);

    storedArray.push(result)
    storedArray.forEach(item => {
        cart += `
        <div class="items">
            <div class='addToCart-details'>
                <h3>Product Code - ${item.code}</h3>
                <h3>Product Price - ${item.price}</h3>
            </div>    
            <img class='addToCart-image' src=${item.image}>
        </div>
          `
    })
    myform.innerHTML = cart
}

function addAddress(id,price,image) {
    document.getElementById("getImageDetails").style.display = "none";
    document.getElementById("buy-product").style.display = "block";
    console.log(`${id}`);
    let buyDetails='';
    buyDetails=`
    <div class="payment-details">
   <div class="payment-details-info">
        <div class='addToCart-details'>
            <h3>Product Code - ${id}</h3>
            <h3>Product Price - ${price}</h3>
        </div>    
        <img class='addToCart-image' src=${image}>
    </div>
    <form id="form-id" onSubmit="formSubmit()">
        <input type="text" id="name" placeholder="Enter Name" pattern="[A-Za-z]{4,20}" required>
        <input type="text" id="mobile" placeholder="Enter Mobile Number" pattern="[6-9]{1}[0-9]{9}" required>
        <textArea type="text" id="address" placeholder="Enter the Address" required></textArea>
        <input type="text" id="city" placeholder="Enter City" pattern="[A-Za-z0-9]{4,30}" required>
        <input type="number" id="number" placeholder="Enter Pin Code"  pattern="[0-9]{6}" required>
        <h4>Payment Process - Cash On Delivery Only</h4>
        <button id="subBtn">Continue</button>
    </form>
    </div>
    `
    buyForm.innerHTML=buyDetails;
}

const closeDetails = () => document.getElementById("getImageDetails").style.display = "none";
function getImage(image, color, price,id) {
    document.getElementById("getImageDetails").style.display = "block";

    let code = '';
    code += `<div class='ImageDetails'>
        <img id='abc' class="getImage" src=${image}>
        <div class="info-wrapper" >
            <div class="info-container__popup">
                <h3 id="color">color - ${color}</h3>
                <h4 id="price">price - $${price}</h4>
            </div>
            <button class='addToCart-btn'  onclick="getDetails(${id}, ${price},'${image}')" >Add To Cart</button>
            <button class='buy-btn' onclick="addAddress(${id},${price},'${image}')">Buy Now</button>
        </div>
    </div>`;

    imageInfo.innerHTML = code;
}

const fetchData = async () => {
    let html = '';
    const response = await fetch('mock.json');
    let data = await response.json()
    data.forEach(item => {
        html += `<div class="images">
                    <img style="width: 70%;"  onclick="getImage('${item.image}','${item.colorName}',${item.price},${item.id})" src=${item.image}>
                    <div class="images__info">
                        <div class="info-container">
                            <h3 id="color">color - ${item.colorName}</h3>
                            <h4 id="price">price - $${item.price}</h4>
                        </div>
                        <button id=${item.id} onclick="getDetails(${item.id}, ${item.price},'${item.image}')" class="add-to-cart">${item.button}</button>
                    </div>
                </div>`
    })
    add.innerHTML = html;
}

fetchData();

