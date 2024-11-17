// import { menuArray } from './data'
const menuArray = [
    {
        name: "pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1
    },
        {
        name: "beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        id: 2
    }
]
const main = document.querySelector('main')
const footer = document.querySelector('footer')

let content = ''
menuArray.forEach((elem)=>{
    content += `

        <section class="container" id="bot">
                <div class="emojiandname">
                    <span class="emoji">${elem.emoji}</span>
                    <div>
                        <p class="title">${elem.name}</p>
                        <p class="ingredient">${elem.ingredients.join(', ')}</p>
                        <P class="price">$${elem.price}</P>
                    </div>
                    
                </div>
                <div>
                    <button class="increment" data-${elem.name}='${elem.name}'>+</button>
                </div>
            </section>

    `
})
main.innerHTML = content
const success = document.getElementById('success')
const increment = document.querySelector('.increment')


const form  = document.getElementById('form')
document.addEventListener('click', checkForClicks)
// document.addEventListener('mousedown', checkForClicks)
let products= []

function checkForClicks(e){
    const overlay = document.getElementById('overlay')

    for(let i = 0; i < menuArray.length; i++){
        if(e.target.dataset.hasOwnProperty(menuArray[i].name)){
            success.style.display = 'none'
            handleProduct(menuArray[i].name,menuArray[i].price)
            console.log(menuArray[i].name)
        }
    }


// menuArray.forEach(function(elem){
    //     if(e.target.dataset.hasOwnProperty(elem.name)){
    //         success.style.display = 'none'
    //         handleProduct(elem.name, elem.price)
    //         console.log(elem.name)
    //     }
    // })

    if(e.target.dataset.remove){
        const removeIndex = products.findIndex(elem => elem.name === e.target.dataset.remove)
        products.splice(removeIndex, 1);
        render()
    }


    if(e.target.id == 'completeOrder'){
        overlay.style.display = 'block';
        increment.disabled = true;
    }

}

function newProduct(name, price){
    this.name = name
    this.quantity = 1
    this.price = price
    this.increaseQuantity = function(){
        this.quantity++;
    }
    
}

function handleProduct(product, price){
    
    let foundProduct = products.find(obj => obj.name === product)
    if(!foundProduct) products.push(new newProduct(product, price) )
    else foundProduct.increaseQuantity()

    render()
}

function render(){
    let content = ''
    products.forEach(product =>{
            content += `      
                <div class="orders">
                    <div class="info">
                        <h4>${product.name}</h4>
                        <button class="remove" data-remove=${product.name}>remove</button>
                    </div>
                    <p class="total-price">$${product.price * product.quantity}</p>
                </div>
        `
    })
let totalPrice = 0
    for (let i = 0; i < products.length; i++) {
        
        totalPrice += products[i].price * products[i].quantity
        
} 
    let totalContent = `
        <h3>Your order</h3>
        ${content}
        <div class="total">
                    <h4>Total price:</h4>
                    <p>$${totalPrice}</p>
                </div>

        <button id="completeOrder" class="btn">Complete order</button>
    `

    footer.innerHTML = totalContent
    footer.style.display = 'block'
}

// const form  = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const overlay = document.getElementById('overlay')
    
    overlay.style.display = 'none';


    const name = new FormData(form).get('name')
    // const card_number = new FormData(form).get('card-number')
    // const cvv = new FormData(form).get('cvv')

    footer.style.display = 'none'
        products = []
        increment.disabled = false

    success.innerHTML = `<p>Thanks, ${name}! Your order is on its way!</p>`
    success.style.display = 'block';

    // render()
    
})