let addToCart = document.querySelectorAll('.shopping-cart__collections');
let add = document.getElementById('add');
let cartButton = document.getElementById('Cart-btn');
let countCart = document.getElementById('count');
let form = '';

let storedArray = []
let count = 0;
let myform = document.getElementById("product");
window.onload = () => document.getElementById("myform").style.display = "none";

const openCart = () => document.getElementById("myform").style.display = "block";
const closeForm = () => document.getElementById("myform").style.display = "none";

const resturnObject = (id, price) => ({ code: id, price: price })

const getDetails = (id, price) => {
    document.getElementById("myform").style.display = "none";
    count += 1;
    let cart = '';
    countCart.innerHTML = count;
    let result = resturnObject(id, price);

    storedArray.push(result)
    storedArray.forEach(item => {
        cart += `
        <div class="items"><h3>Product Code - ${item.code}</h3>
          <h3>Product Price - ${item.price}</h3></div>
          <h3>Product Price - ${item.image}</h3></div>
          `
    })
    myform.innerHTML = cart
}

// function getImage(image) {
//     console.log(`h`)
// }

const  fetchData = async () => {
    let html = '';
    const response = await fetch('mock.json');
    let data = await response.json()
    data.forEach(item => {
        html += `<div class="images">
                    <img style="width: 70%;" onclick="getImage(${item.image})" src=${item.image}>
                    <div class="images__info">
                        <div class="info-container">
                            <h3 id="color">color - ${item.colorName}</h3>
                            <h4 id="price">price - $${item.price}</h4>
                        </div>
                        <button id=${item.id} onclick="getDetails(${item.id}, ${item.price})" class="add-to-cart">${item.button}</button>
                    </div>
                </div>`
    })

    add.innerHTML = html;
}
fetchData();
