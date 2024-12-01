const countEL = document.querySelector(".count");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cartIcon = document.querySelector(".cart i");
const cartContainer = document.querySelector(".cart-container");
const cartCount = document.querySelector(".cart-count");
const addToCartBtn = document.querySelector(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");

let count = 0;
let totalQty = 0;

const updateCount = (newCount) => {
  count = newCount;
  countEL.textContent = count;
};

minus.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

plus.addEventListener("click", () => {
  updateCount(count + 1);
});

cartIcon.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

cartCount.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

const updateTotalQty = () => {
  const cartItemsList = document.querySelectorAll(".cart-item");
  totalQty = 0;
  cartItemsList.forEach((item) => {
    totalQty += parseInt(item.dataset.quantity);
  });

  cartCount.innerHTML = `<span class="qty">${totalQty}</span>`;
};

const removeItemFromCart = (cartItem) => {
  cartItem.remove();
  updateTotalQty();

  if (cartItems.children.length == 1) {
    cartItems.classList.add("empty");
    checkout.classList.add("empty");
  }
};

const addItemtoCart = (name, price, imgSrc) => {
  const totalPrice = price * count;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.dataset.quantity = count;
  cartItem.innerHTML = `
       <img src="${imgSrc}" alt="${name}"/>
       <div>
        <div>${name}</div>
        <div>
           <p>
             $${price.toFixed(2)} x ${count}
             <span class="total-price">$${totalPrice.toFixed(2)}</span>
           <p>
        </div>
       </div>
       <button class="delete-item">
       <i class="fa fa-trash" ait="delete icon"></i>
       </button>

       
        <section id="checkout">
        <div class="checkout-container">
          
          <form id="checkout-form">
            
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required />
            
              <label for="card-number">Card Number:</label>
              <input type="text" id="card-number" name="card-number" required />

              <label for="expiry-date">Expiry Date:</label>
              <input type="text" id="expiry-date" name="expiry-date" required />

              <label for="cvv">CVV:</label>
              <input type="text" id="cvv" name="cvv" required />
            
              <button type="submit" class="checkout empty" >Submit</button>
            <button  type="submit"  aria-label="Checkout">
                Checkout 
             </button>
          </form>
        </div>
      </section>
    `;

  cartItems.appendChild(cartItem);
  updateTotalQty();

  if (cartItems.classList.contains("empty")) {
    cartItems.classList.remove("empty");
    checkout.classList.remove("empty");
  }

  /* attach an event listener to the delete button */

  const deleteButton = cartItem.querySelector(".delete-item");
  deleteButton.addEventListener("click", (event) => {
    const cartItem = event.target.closest(".cart-item");
    removeItemFromCart(cartItem);
  });

  /* Checkout Form process */
  document.addEventListener("DOMContentLoaded", function () {
    // Handle keyboard navigation for interactive elements
    document.addEventListener("keydown", function (event) {
      const activeElement = document.activeElement;
      const courseItems = Array.from(document.querySelectorAll(".courses"));

      if (event.key === "Enter" || event.key === " ") {
        if (
          activeElement.tagName === "BUTTON" ||
          activeElement.getAttribute("role") === "button"
        ) {
          activeElement.click();
        }
      }

      let currentIndex = courseItems.indexOf(activeElement);

      switch (event.key) {
        case "ArrowRight":
          if (currentIndex < courseItems.length - 1) {
            courseItems[currentIndex + 1].focus();
          }
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            courseItems[currentIndex - 1].focus();
          }
          break;
        case "ArrowDown":
          if (currentIndex + 3 < courseItems.length) {
            courseItems[currentIndex + 3].focus();
          }
          break;
        case "ArrowUp":
          if (currentIndex - 3 >= 0) {
            courseItems[currentIndex - 3].focus();
          }
          break;
      }
    });

    // Ensure focus is managed appropriately
    const courseItems = document.querySelectorAll(".courses .form-control");
    courseItems.forEach((item) => {
      item.addEventListener("focus", function () {
        item.classList.add("focused");
      });
      item.addEventListener("blur", function () {
        item.classList.remove("focused");
      });
    });

    // Form validation and submission
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;

      const cardNumber = document.getElementById("card-number").value;
      const expiryDate = document.getElementById("expiry-date").value;
      const cvv = document.getElementById("cvv").value;

      if (!name || !cardNumber || !expiryDate || !cvv) {
        alert("Please fill in all fields.");
        return;
      }

      // Perform additional validation if needed

      // Submit the form data
      alert("Checkout successful!");
      checkoutForm.reset();
    });
  });
};

addToCartBtn.addEventListener("click", () => {
  if (count === 0) return;

  const productName = document.querySelector(
    ".main2 .product-name"
  ).textContent;
  const productPriceEl = document.querySelector(".main2 .current-price");
  const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
  const productImg = document
    .querySelector(".default.gallery .main-img img")
    .getAttribute("src");

  addItemtoCart(productName, productPrice, productImg);
  cartContainer.classList.add("active");

  updateCount(0);
});
