import { menuArray } from "./data.js";

let cartArray = []


render()
const formEl = document.querySelector('form')
document.getElementById('total-order-wrapper').classList.add('hidden')


// completeOrder.addEventListener('click', getPaymentScreen)

function getPaymentScreen(id) {
    if (cartArray.length > 0) {
        const paymentScreen = document.getElementById('payment-form')
        paymentScreen.classList.remove("none")
    }
    else {
        alert("Please pick an item");
    }
}



formEl.addEventListener("submit", (e) =>{
    e.preventDefault();
    const username = document.getElementById('username')
    console.log(username.value);
    const paymentScreen = document.getElementById('payment-form')
    paymentScreen.classList.add("none")
    render()
})

document.addEventListener('click', function(event){
    if (event.target.dataset.btn) {
        handleAddBtnClick(event.target.dataset.btn)
    }
    else if (event.target.dataset.remove) {
        handleRemoveBtnClick(event.target.dataset.remove)
    }
    else if (event.target.id === 'complete-order-btn'){
        getPaymentScreen(event.target.id)
    }
    
})

function handleAddBtnClick(id){
    menuArray.forEach(function(e){
        if (e.id === Number(id) && !cartArray.includes(e)){
            cartArray.push(e)
        }
    })
    render()

    document.getElementById('total-order-wrapper').classList.remove('hidden')
}

function handleRemoveBtnClick(id){
    const targetObj = cartArray.filter(function(e){
        if(e.id === Number(id)){
            return e
        }
    })[0]

    const index = cartArray.indexOf(targetObj);
    if (index > -1) { // only splice array when item is found
    cartArray.splice(index, 1); // 2nd parameter means remove one item only
    }

    render()

    if(cartArray.length < 1){
        document.getElementById('total-order-wrapper').classList.add('hidden')
    }
}


function getHtml() {
    
    let feedHtml = ``


    menuArray.forEach(function(item){

        


        feedHtml += `
        <section>
            <div class="container">
                <div class="order-box">
                <p class="item-logo">${item.emoji}</p>
                <div class="item-info">
                    <h2">${item.name}</h2>
                    <p class="ingredients">${item.ingredients}</p>
                    <h4>${item.price}</h4>

                </div>
                <button class="add-btn" data-btn="${item.id}">+</button>
                </div>
            </div>
        </section>`
    })

    

    let cartString = ``
    let totalPrice = 0
    if (cartArray.length > 0){
        cartArray.forEach(function(e){
            totalPrice += e.price
            cartString += 
            `<div class="shopping-cart" id="shopping-cart">
            <h2>${e.name}</h2>
            <span class="remove-btn" data-remove="${e.id}">remove</span>
            <h3>${e.price}$</h3>   
            </div>`
        })

    }
    let shoppingCartTop = `
            <section>
                <div class="container">
                <div class="total-order-wrapper" id="total-order-wrapper">
                    <div class="total-order-section">
                        <div class="your-order-title">
                            <h2>Your Order</h2>
                        </div>
                        <div id="orders-wrapper">
        `

    

    let shoppingCartBottom = `
                    </div>
                        <div class="total-price">
                            <h2>Total Price:</h2>
                            <h3 id="total-amount">${totalPrice}$</h3>
                        </div>
                        <div class="complete-order-btn-wrapper">
                            <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        `

    const username = document.getElementById('username')
    if(username.value){
        let greetings = `
        <div class="container">
            <div class="total-order-wrapper" id="total-order-wrapper">
                <div class="total-order-section greetings-wrapper">
                    <div class="greetings">
                    <h2>Thanks, ${username.value}! your order is on its way!</h2>
                    </div>
                </div>
            </div>
        </div>
        `
        feedHtml += greetings
    }else {
        feedHtml += shoppingCartTop
        feedHtml += cartString
        feedHtml += shoppingCartBottom
    }

        
    return feedHtml
}


function render() {
    document.getElementById('feed-html-wrapper').innerHTML = getHtml()
}

