// ================= NAVBAR =================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

// ================= PRODUCTS =================

const products = [

  // SHAWARMA

  {
    id: 1,
    name: "Chicken Shawarma",
    price: 4500,
    category: "shawarma",
    image: "images/shawarma1.webp"
  },

  {
    id: 2,
    name: "Beef Shawarma",
    price: 4500,
    category: "shawarma",
    image: "images/bestseller2.webp"
  },

  {
    id: 3,
    name: "Tripple sausage mixed Shawarma",
    price: 5000,
    category: "shawarma",
    image: "images/doublesausage.webp"
  },

  {
    id: 4,
    name: "Jumbo Shawarma-4 sausages",
    price: 6500,
    category: "shawarma",
    image: "images/jumbo.webp"
  },
  {
    id: 20,
    name: "Meat Pie",
    price: 1000,
    category: "shawarma",
    image: "images/meatpie.webp"
  },

  // PIZZA

  {
    id: 5,
    name: "Chicken Pizza",
    price: 14000,
    category: "pizza",
    image: "images/_bestseller1_900x750.webp"
  },

  {
    id: 6,
    name: "Chicken Pizza-8 inches",
    price: 8000,
    category: "pizza",
    image: "images/chickenpizza8inches.webp"
  },

  {
    id: 7,
    name: "beef Pizza-10 inches",
    price: 12000,
    category: "pizza",
    image: "images/12inchespizza.webp"
  },

  {
    id: 8,
    name: "Milk bread",
    price: 1600,
    category: "pizza",
    image: "images/bread.webp"
  },

  // BURGERS

  {
    id: 9,
    name: "Chicken Burger",
    price: 6000,
    category: "burger",
    image: "images/buger.webp"
  },

  {
    id: 10,
    name: "Burger combo",
    price: 10000,
    category: "burger",
    image: "images/drink.webp"
  },

  {
    id: 11,
    name: "Burger and chips",
    price: 7000,
    category: "burger",
    image: "images/burgerandchips.webp"
  },

  {
    id: 12,
    name: "Single party beef Burger",
    price: 5000,
    category: "burger",
    image: "images/catering.webp"
  },

  // DRINKS

  {
    id: 13,
    name: "Gineer yogurt",
    price: 2000,
    category: "drinks",
    image: "images/yoghurt.webp"
  },

  {
    id: 14,
    name: "Gineer milkshake",
    price: 3000,
    category: "drinks",
    image: "images/milkshake.webp"
  },

  {
    id: 15,
    name: "Oreo Cookies Milkshake",
    price: 4000,
    category: "drinks",
    image: "images/oreocookies.webp"
  },

  {
    id: 16,
    name: "Gineer Zobo-Drink",
    price: 1200,
    category: "drinks",
    image: "images/zobo.webp"
  },

  // parfaits==
  {
    id: 17,
    name: "Fruit Parfait",
    price: 5000,
    category: "parfait",
    image: "images/parfait1.webp"
  },
  {
    id: 18,
    name: "Fruit Parfait",
    price: 6500,
    category: "parfait",
    image: "images/parfait2.webp"
  },
  {
    id: 19,
    name: "Fruit parfait-Big Cup",
    price: 7000,
    category: "parfait",
    image: "images/parfait3.webp"
  },


];
// ================= CART =================

let cart = JSON.parse(
  localStorage.getItem("cart")
) || [];

// ================= MENU DISPLAY =================

const foodGrid = document.getElementById("food-grid");

function displayProducts(items) {

  if (!foodGrid) return;

  foodGrid.innerHTML = "";

  items.forEach(product => {

    foodGrid.innerHTML += `
<div class="food-card">

    <img src="${product.image}" alt="${product.name}">

    <div class="food-info">

        <div class="rating">
    
        </div>

        <h3>${product.name}</h3>

<p class="food-desc">

Freshly prepared and served hot.

</p>

        <div class="food-price">
            ₦${product.price.toLocaleString()}
        </div>

        <button
        class="add-cart"
        onclick="addToCart(${product.id})">

        <i class="fa-solid fa-cart-plus"></i>
        Add

        </button>

    </div>

</div>
`;

  });

}

// ================= ADD TO CART =================

function addToCart(id) {

  const product = products.find(
    item => item.id === id
  );

  if (!product) return;

  const existingItem = cart.find(
    item => item.id === id
  );

  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  saveCart();

  showToast(
    `${product.name} added to cart`
  );

}

// ================= UPDATE CART BADGE =================

function updateCartCount() {

  const cartCount =
    document.getElementById("cart-count");

  const floatingCount =
    document.getElementById(
      "floating-cart-count"
    );

  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  if (cartCount) {

    cartCount.textContent =
      totalItems;

  }

  if (floatingCount) {

    floatingCount.textContent =
      totalItems;

    const floatingBtn =
      document.querySelector(
        ".floating-cart-btn"
      );

    if (totalItems === 0) {

      floatingBtn.style.display =
        "none";

    } else {

      floatingBtn.style.display =
        "flex";

    }

  }

}

// ================= SAVE CART =================

function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  renderCart();

}

// ================= TOAST =================

function showToast(message) {

  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 2000);

}

// ================= CART PAGE =================

function renderCart() {

  const cartItems =
    document.getElementById("cart-items");

  const subtotalElement =
    document.getElementById("subtotal");

  if (!cartItems || !subtotalElement) return;


  if(cart.length === 0){

cartItems.innerHTML = `

<div class="empty-cart">

<div class="empty-cart-icon">

🛒

</div>

<h2>

Your cart is empty

</h2>

<p>

Start adding delicious meals

</p>

<a href="index.html#categories"
class="browse-btn">

Browse Menu

</a>

</div>

`;

document.getElementById(
"subtotal"
).textContent =
"₦0";

return;

}

  cartItems.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <h3>Your cart is empty</h3>
    `;

    subtotalElement.textContent = "₦0";

    return;

  }

  cart.forEach(item => {

    subtotal +=
      item.price * item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}" alt="${item.name}">

        <div>

          <h3>${item.name}</h3>

          <p>
            ₦${item.price.toLocaleString()}
          </p>
          <button
class="remove-btn"
onclick="removeItem(${item.id})">

🗑

</button>

        </div>

        <div class="qty-controls">

          <button
            onclick="decreaseQty(${item.id})">

            -

          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            onclick="increaseQty(${item.id})">

            +

          </button>
          

          

        </div>

        

      </div>
      

    `;

  });

  subtotalElement.textContent =
    `₦${subtotal.toLocaleString()}`;

}

function removeItem(id) {

  cart = cart.filter(
    item => item.id !== id
  );

  saveCart();

}

// ================= QUANTITY CONTROLS =================

function increaseQty(id) {

  const item = cart.find(
    item => item.id === id
  );

  if (!item) return;

  item.quantity++;

  saveCart();

}

function decreaseQty(id) {

  const item = cart.find(
    item => item.id === id
  );

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {

    cart = cart.filter(
      product => product.id !== id
    );

  }

  saveCart();

}

// ================= CATEGORY FILTER =================

const categoryBtns =
  document.querySelectorAll(".category-btn");

categoryBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    categoryBtns.forEach(item => {
      item.classList.remove("active");
    });

    btn.classList.add("active");

    const category =
      btn.dataset.category;

    if (category === "all") {

      displayProducts(products);

    } else {

      const filteredProducts =
        products.filter(
          product =>
            product.category === category
        );

      displayProducts(filteredProducts);

    }

  });

});

// ================= INITIALIZE =================

displayProducts(products);

updateCartCount();

renderCart();


// ================= CHECKOUT =================

const checkoutItems =
  document.getElementById(
    "checkout-items"
  );

const checkoutSubtotal =
  document.getElementById(
    "checkout-subtotal"
  );

const checkoutTotal =
  document.getElementById(
    "checkout-total"
  );

const deliveryFeeElement =
  document.getElementById(
    "delivery-fee"
  );

if (checkoutItems) {

  let subtotal = 0;

  cart.forEach(item => {

    subtotal +=
      item.price *
      item.quantity;

    checkoutItems.innerHTML += `

<p>

${item.quantity} x
${item.name}

</p>

`;

  });

  checkoutSubtotal.textContent =
    `₦${subtotal.toLocaleString()}`;

  checkoutTotal.textContent =
    `₦${subtotal.toLocaleString()}`;

}


const addressBox =
  document.getElementById("address-box");

const orderTypeRadios =
  document.querySelectorAll(
    'input[name="orderType"]'
  );

function updateDeliveryFee() {

  let subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.price * item.quantity),
    0
  );

  const selectedRadio =
document.querySelector(
'input[name="orderType"]:checked'
);

if(!selectedRadio) return;

const selectedType =
selectedRadio.value;

  if (selectedType === "Delivery") {

    addressBox.style.display = "block";

    deliveryFeeElement.textContent =
      "₦1,500";

    checkoutTotal.textContent =
      `₦${(subtotal + 1500).toLocaleString()}`;

  } else {

    addressBox.style.display = "none";

    deliveryFeeElement.textContent =
      "₦0";

    checkoutTotal.textContent =
      `₦${subtotal.toLocaleString()}`;

  }

}

orderTypeRadios.forEach(radio => {

  radio.addEventListener(
    "change",
    updateDeliveryFee
  );

});

updateDeliveryFee();
// place order==============


const placeOrderBtn =
  document.getElementById(
    "place-order"
  );

if (placeOrderBtn) {

  placeOrderBtn.addEventListener(
    "click",
    placeOrder
  );

}

function placeOrder() {

  const customerName =
    document.getElementById(
      "customer-name"
    ).value;

  const customerPhone =
    document.getElementById(
      "customer-phone"
    ).value;

  const branch =
    selectedBranch;

  const address =
    document.getElementById(
      "address"
    )?.value || "";

  const orderType =
    document.querySelector(
      'input[name="orderType"]:checked'
    ).value;

  if (
    !customerName ||
    !customerPhone ||
    !branch
  ) {

    alert(
      "Please complete all required fields."
    );

    return;

  }

  if (
    orderType === "Delivery" &&
    !address.trim()
  ) {

    alert(
      "Please enter delivery address."
    );

    return;

  }

  let subtotal = 0;

  let orderItems = "";

  cart.forEach(item => {

    subtotal +=
      item.price *
      item.quantity;

    orderItems +=

      `${item.quantity} x ${item.name}
- ₦${(
        item.price *
        item.quantity
      ).toLocaleString()}

`;

  });

  let deliveryFee =

    orderType === "Delivery"
      ? 1500
      : 0;

  let total =
    subtotal + deliveryFee;

  const message =

    `🍔 GINEER TASTY GRILLS

Customer: ${customerName}

Phone: ${customerPhone}

Order Type: ${orderType}

Branch: ${branch}

Address: ${address || "N/A"}

------------------------

${orderItems}

------------------------

Subtotal:
₦${subtotal.toLocaleString()}

Delivery Fee:
₦${deliveryFee.toLocaleString()}

Total:
₦${total.toLocaleString()}
`;

  const whatsappUrl =

    `https://wa.me/2349033035249?text=${encodeURIComponent(message)}`;

  localStorage.removeItem(
    "cart"
  );

  window.open(
    whatsappUrl,
    "_blank"
  );

  setTimeout(() => {

    window.location.href =
      "thankyou.html";

  }, 5000);

}


let selectedBranch = "";

const branchCards =
  document.querySelectorAll(
    ".branch-card"
  );

branchCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      branchCards.forEach(
        item =>
          item.classList.remove(
            "active"
          )
      );

      card.classList.add(
        "active"
      );

      selectedBranch =
        card.dataset.branch;

    });

});

// search-bar===================



const searchInput =
  document.getElementById(
    "search-input"
  );

if (searchInput) {

  searchInput.addEventListener(
    "input",
    (e) => {

      const value =
        e.target.value.toLowerCase();

      const filteredProducts =
        products.filter(product =>

          product.name
            .toLowerCase()
            .includes(value)

        );

      displayProducts(
        filteredProducts
      );

    });

}

// scroll-reveal================

const revealElements =
document.querySelectorAll(
".food-card,.featured-card"
);

window.addEventListener(
"scroll",
()=>{

revealElements.forEach(el=>{

const top =
el.getBoundingClientRect().top;

if(top < window.innerHeight - 100){

el.classList.add("show");

}

});

});


window.addEventListener(
"load",
()=>{

setTimeout(()=>{

const loader =
document.getElementById(
"loader"
);

if(loader){

loader.style.opacity="0";

loader.style.transition=
".5s";

setTimeout(()=>{

loader.style.display=
"none";

},500);

}

},2000);

});


// notification pup op==============
const whatsappPopup =
document.getElementById(
"whatsappPopup"
);

const closePopup =
document.getElementById(
"closePopup"
);

setTimeout(()=>{

    if(whatsappPopup){

        whatsappPopup.classList.add(
        "show"
        );

    }

},6000);

if(closePopup){

    closePopup.addEventListener(
    "click",
    ()=>{

        whatsappPopup.classList.remove(
        "show"
        );

    }
    );

}


// faq====================
const faqQuestions =
document.querySelectorAll(
".faq-question"
);

faqQuestions.forEach(question=>{

    question.addEventListener(
    "click",
    ()=>{

        const answer =
        question.nextElementSibling;

        const icon =
        question.querySelector("span");

        if(answer.style.maxHeight){

            answer.style.maxHeight =
            null;

            icon.textContent = "+";

        }else{

            answer.style.maxHeight =
            answer.scrollHeight +
            "px";

            icon.textContent = "−";

        }

    });

});



const counters =
document.querySelectorAll(
".counter"
);

counters.forEach(counter=>{

    const updateCounter = ()=>{

        const target =
        +counter.dataset.target;

        const current =
        +counter.innerText;

        const increment =
        target / 100;

        if(current < target){

            counter.innerText =
            Math.ceil(
            current +
            increment
            );

            setTimeout(
            updateCounter,
            20
            );

        }else{

            counter.innerText =
            target.toLocaleString() +
            "+";

        }

    };

    updateCounter();

});

// orderpopup=================

const recentOrders = [

{
name:"Chinedu",
location:"Nsukka",
food:" Chicken Shawarma"
},

{
name:"Ada",
location:"independence layout",
food:"🍕 Special Pizza"
},

{
name:"David",
location:"Abuja",
food:"🍔 double Burger"
},

{
name:"Favour",
location:"obollo",
food:" Coke Combo"
},

{
name:"Michael",
location:"Nsukka",
food:" beef Shawarma"
},

{
name:"Precious",
location:"uwani",
food:"🍕 BBQ and Pizza"
}

];

const popup =
document.getElementById(
"orderPopup"
);

const popupName =
document.getElementById(
"popupName"
);

const popupOrder =
document.getElementById(
"popupOrder"
);

function showOrderPopup(){

if(!popup) return;

const order = recentOrders[
Math.floor(
Math.random() *
recentOrders.length
)
];

popupName.textContent =
`${order.name} from ${order.location}`;

popupOrder.textContent =
`just ordered ${order.food}`;

popup.classList.add(
"show"
);

setTimeout(()=>{

popup.classList.remove(
"show"
);

},4000);

}

setTimeout(()=>{

showOrderPopup();

setInterval(
showOrderPopup,
30000
);

},8000);



// video=================
function changeVideo(video,event){

const iframe =
document.getElementById("mainVideo");

const videos = {

1:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F997215209458774%2F&show_text=false&width=267&t=0",

2:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F2905396793161226%2F&show_text=false&width=267&t=0",

3:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F1165118382362767%2F&show_text=false&width=267&t=0"

};

iframe.src = videos[video];

document
.querySelectorAll(".video-tab")
.forEach(btn=>btn.classList.remove("active"));

event.target.classList.add("active");

}



const trackingSteps =
document.querySelectorAll(".tracking-step");

let currentStep = 0;

setInterval(() => {

    trackingSteps.forEach(step => {

        step.classList.remove("active");

    });

    currentStep++;

    if(currentStep >= trackingSteps.length){

        currentStep = 0;

    }

    trackingSteps[currentStep]
    .classList.add("active");

},90000);




const scrollTopBtn =
document.getElementById("scrollTopBtn");

window.addEventListener(
"scroll",
() => {

    if(window.scrollY > 300){

        scrollTopBtn.classList.add("show");

    }else{

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener(
"click",
() => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});



