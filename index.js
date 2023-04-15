import { menuArray } from "./data.js";

const shoppingCartTitle= document.querySelector(".shopping-cart-title")
const completeOrderBtn = document.querySelector(".complete-order-btn.btn")
const shoppingCart = document.querySelector(".shopping-cart")
const bottomScroll = document.querySelector(".bottom-scroll")
const paymentScreen = document.querySelector(".payment-screen")
const paymentForm = document.querySelector("#myForm")
const closeBtn = document.querySelector(".close-btn")

let isFormOn = false
let paymentIsDone = false
let cartArray = []
let userName = ``

document.addEventListener("click", (e) => {
    if (e.target.id.includes("btn-")) {
        if(isFormOn == true){

        } else {
        handleAddBtn(e.target.id)
        }
    }
    if (e.target.dataset.item){
        if(isFormOn == true){

        } else {
            handleRemovebtn(e.target.dataset.item);
        }
        
    }
    if (e.target.className === "complete-order-btn btn"){
        handleCompleteOrderBtn()
    }
})

function handleAddBtn(btnId) {
    for (const item of menuArray) {
        if(btnId == `btn-${item.id}`){
            cartArray.push(item)
        }
    }
    const y = bottomScroll.getBoundingClientRect().top + window.pageYOffset + bottomScroll.offsetHeight;
    const bodyHeight = document.body.offsetHeight;
    window.scrollTo({ top: Math.min(y, bodyHeight), behavior: 'smooth' });
    render()
}

function handleRemovebtn(dataId) {
    if (dataId > -1) {
        cartArray.splice(dataId, 1);
    }
    render()
}

function handleCompleteOrderBtn() {
    
    if (cartArray.length > 0){
        paymentScreen.style.display = "block"
    }
    isFormOn = true
    render()
}


paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    paymentIsDone = true
    
    cartArray = []
    paymentScreen.style.display = "none"
    hideShoppingCart()

    const formData = new FormData(e.target);
    userName = formData.get('name');

    render()

    setTimeout(() => {
        paymentIsDone = false
        isFormOn = false
        render()
    }, 3000)
})

closeBtn.addEventListener("click", () => {
    paymentScreen.style.display = "none"

    paymentIsDone = false
    isFormOn = false
    render()

})

function hideShoppingCart() {
    shoppingCart.style.display ="none"
    completeOrderBtn.style.display ="none"
    shoppingCartTitle.style.display ="none"
}

function showShoppingCart() {
    shoppingCart.style.display ="block"
    completeOrderBtn.style.display ="block"
    shoppingCartTitle.style.display ="block"
}


function getHtmlFeed() {
    let feedContainer = document.querySelector(".feed")
    let feedString = ""

    for (const item of menuArray) {
        
        feedString += `
            <div class="item">
                <p class="item-logo">${item.emoji}</p>
                <div class="item-info">
                    <h2 class="item-info-title">${item.name}</h2>
                    <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                    <p class="item-price">${item.price}$</p>
                </div>
                <button class="add-btn"  id="btn-${item.id}">+</button>
            </div>`
    }
    feedContainer.innerHTML= feedString


    if (cartArray.length > 0) {
        showShoppingCart()
        let shoppingCartFeed = ``
        let i = 0
        let totalPrice = 0
        for (const item of cartArray) {
            shoppingCartFeed += `
                <div class="shopping-cart-item" id="card-item-${i}">
                    <p class="shopping-cart-item-title">${item.name}</p>
                    <p class="shopping-cart-item-remove" data-item="${i}">remove</p>
                    <p class="shopping-cart-item-price">${item.price}$</p>
                </div>
        `
        totalPrice += item.price
        i++
        }

        const totalString = `
        <div class="total-price-wrapper">
            <p class="total-price-text">Total price:</p>
            <p class="total-price">${totalPrice}$</p>
        </div>

        `
        
        shoppingCartFeed += totalString
        shoppingCart.innerHTML = shoppingCartFeed
    

    } else {
        hideShoppingCart()
    }

    if (paymentIsDone == true) {
        shoppingCart.style.display = "block"
        shoppingCart.innerHTML = `
        <div class="successfull">
            <p class="greetings">Thanks, ${userName}! Your order is on its way!</p>
        </div>
        `
    }
    
}

function render() {
    getHtmlFeed()
}


render()