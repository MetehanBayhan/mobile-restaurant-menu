import { menuArray } from "./data.js";

const order = document.querySelector(".order")
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
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">${item.price}$</p>
                </div>
                <button class="add-btn"  id="btn-${item.id}">+</button>
            </div>`
    }
    feedContainer.innerHTML= feedString


    if (cartArray.length > 0) {
        order.style.visibility ="visible"
        const shoppingCart = document.querySelector(".shopping-cart")
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
        
        order.style.visibility ="hidden"
    }
    
}

function render() {
    getHtmlFeed()
}


render()