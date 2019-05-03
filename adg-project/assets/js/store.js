if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// removing items from cart 
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


}

function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0]

    //  popup modal
    var modal = document.getElementById("myModal"),
        text = modal.getElementsByClassName("modal-body")[0];

    var button = document.getElementsByClassName("btn-purchase")[0];

    // trigger the modal by setting up the attribute on submit button
    text.getElementsByTagName("p")[0].innerHTML = "Thank you for your purchase";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#myModal");

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// adding to cart
function addToCartClicked(event) {

    var button = event.target
    var shopItem = button.parentElement.parentElement

    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    addItemToCart(title, price, imageSrc, button)
    updateCartTotal()

  
    button.removeAttribute("data-toggle", "modal");
    button.removeAttribute("data-target", "#myModal");
}

function addItemToCart(title, price, imageSrc, button) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    var cartItems = document.getElementsByClassName('cart-items')[0];
    var totalItems = cartItems.getElementsByClassName('cart-row');
    var condition = true;

    
    var modal = document.getElementById("myModal"),
        text = modal.getElementsByClassName("modal-body")[0];

    // checking if item is already in the cart
    for (var i = 0; i < totalItems.length; i++) {
        var elem = totalItems[i].children[0].lastElementChild;
        if ((elem.innerHTML || elem.firstChild.firstChild.innerHTML) === title) {
            condition = false;
        }
    }

    // item already in cart - this is not correctly functioning 
    if (condition) {
        var cartRowContents = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    } else {
        //trigger popup model
        text.getElementsByTagName("p")[0].innerHTML = "Already Added to cart!!";

        // getting the button from addToCartClicked() function
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#myModal");

    }

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = (Math.round(total * 100) / 100).toFixed(2);
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

// form validation
var errorText = (text) => {
    var element = document.getElementById(`${text}`);
    if (element.lastElementChild.nodeName !== "DIV") {
        var small = document.createElement("div");
        small.style = "font-size:12px";
        var message = `<small id=${text}help class="form-text text-muted" style="color:red !important;">
    This Is Required.
    </small>`;
        small.innerHTML = message
        element.appendChild(small);
    }
}

var checkForError = (e) => {
    if (e.target.value.length > 0 && e.target.parentElement.lastElementChild.nodeName === "DIV") {
        e.target.parentElement.removeChild(e.target.parentElement.lastElementChild)
    }
}

// this function will execute on submit button form fields to JSON and checking if the field is empty
var createJsonFormat = (e) => {
    e.preventDefault();
    var items = document.getElementsByClassName("cart-items")[0],
        totalItems = items.getElementsByClassName('cart-row'),
        totalPrice = document.getElementsByClassName('cart-total-price')[0].innerText,

        // Form fields
        output = document.getElementById("cartOutput"),
        firstName = document.getElementById("formFirstName").value,
        lastName = document.getElementById("formLastName").value,
        address = document.getElementById("formAddress").value,
        city = document.getElementById("formCity").value,
        email = document.getElementById("formEmail").value,
        zip = document.getElementById("formZip").value,
        phone = document.getElementById("formPhone").value,
        province = document.getElementById("formProvince").value,
        zip = document.getElementById("formZip").value,
        country = document.getElementById("formCountry").value,
        apt = document.getElementById("formApt").value,

        //  popup modal
        modal = document.getElementById("myModal"),
        text = modal.getElementsByClassName("modal-body")[0];

    // remove the attribute that will popup the modal
    e.target.removeAttribute("data-toggle", "modal");
    e.target.removeAttribute("data-target", "#myModal");

    // if any form field is empty after submission

    switch (0) {
        case email.length:
            errorText("email");
            text.getElementsByTagName("p")[0].innerHTML = "Plesae Enter Your Email";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case firstName.length:
            errorText("firstName");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your First Name";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case lastName.length:
            errorText("lastName");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your Last Name";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case address.length:
            errorText("address");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your Stree Address";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case apt.length:
            errorText("apt");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your Apartment Number";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case city.length:
            errorText("city");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your City";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case country.length:
            errorText("country");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your Providence";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case province.length:
            errorText("province");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your Zipcode";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case zip.length:
            errorText("zip");

            text.getElementsByTagName("p")[0].innerHTML = "Please Enter Your Phone Number";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        case phone.length:
            errorText("phone");

            text.getElementsByTagName("p")[0].innerHTML = "Please Fill Out The Required Fields";
            e.target.setAttribute("data-toggle", "modal");
            e.target.setAttribute("data-target", "#myModal");
            break;
        default: {
            //  if field is not empty

            var UserArray = []
            var productArray = []
            for (var i = 0; i < totalItems.length; i++) {
                var item = totalItems[i].querySelector(".cart-item-title").innerHTML,
                    price = totalItems[i].querySelector(".cart-price").innerHTML,
                    quantity = totalItems[i].querySelector(".cart-quantity-input").value;
                productArray.push({
                    "Item": `${item}`,
                    "Price": `${price}`,
                    "Quantity": `${quantity}`
                })
            }
            //  if cart is empty

            if (productArray.length !== 0) {
                UserArray.push({
                    UserData: {
                        "FirstName": `${firstName}`,
                        "LastName": `${lastName}`,
                        "Email": `${email}`,
                        "Address": `${address}`,
                        "City": `${city}`,
                        "Cart": {
                            Product: productArray
                        },
                        "TotalPrice": totalPrice
                    }
                })
                output.innerHTML = JSON.stringify(UserArray, undefined, 4).replace(/\\n/g, " ");
                purchaseClicked()
            } else {
                text.getElementsByTagName("p")[0].innerHTML = "Your Cart Is Empty";
                e.target.setAttribute("data-toggle", "modal");
                e.target.setAttribute("data-target", "#myModal");
            }
        }
    }
}
