import { menuArray } from "./data.js";

const shoppingCartTitle= document.querySelector(".shopping-cart-title")
const completeOrderBtn = document.querySelector(".complete-order-btn")
const shoppingCart = document.querySelector(".shopping-cart")
const bottomScroll = document.querySelector(".bottom-scroll")

const cartArray = []

document.addEventListener("click", (e) => {
    if (e.target.id.includes("btn-")) {
        handleAddBtn(e.target.id)
    }
    if (e.target.dataset.item){
        handleRemovebtn(e.target.dataset.item);
    }
})

function handleAddBtn(btnId) {
    for (const item of menuArray) {
        if(btnId == `btn-${item.id}`){
            console.log("this btn is for: " + item.name);
            cartArray.push(item)
            console.log(cartArray);
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
    if (cartArray.length < 1) {
        const shoppingCart = document.querySelector(".order")
    }
    render()
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
        completeOrderBtn.style.visibility ="visible"
        shoppingCartTitle.style.visibility ="visible"
        shoppingCart.style.visibility ="visible"
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
            <p class="total-price-text">total-price</p>
            <p class="total-price">${totalPrice}$</p>
        </div>

        `
        
        shoppingCartFeed += totalString
        shoppingCart.innerHTML = shoppingCartFeed
    

    } else {
        const shoppingCart = document.querySelector(".shopping-cart")
        shoppingCart.style.visibility ="hidden"
        completeOrderBtn.style.visibility ="hidden"
        shoppingCartTitle.style.visibility ="hidden"
    }
    
}

function render() {
    getHtmlFeed()
}


render()