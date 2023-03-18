import { menuArray } from "./data.js";

let cartArray = []

document.addEventListener('click', function(event){
    if (event.target.id) {
        handleAddBtnClick(event.target.id)
    }
    else if (event.target.dataset.remove) {
        handleRemoveBtnClick(event.target.dataset.remove)
    }
    
})

function handleAddBtnClick(id){
    menuArray.forEach(function(e){
        if (e.id === Number(id)){
            cartArray.push(e)
        }
    })
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
                <button class="add-btn" id="${item.id}">+</button>
                </div>
            </div>
        </section>`
    })


    if (cartArray.length > 0){
        let cartString = ``
        cartArray.forEach(function(e){
            cartString += 
            `<div>
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
                            <h3 id="total-amount"></h3>
                        </div>
                        <div class="complete-order-btn-wrapper">
                            <button class="complete-order-btn">Complete Order</button>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        `

    return feedHtml
}


function render() {
    document.getElementById('feed-html-wrapper').innerHTML = getHtml()
}

render()