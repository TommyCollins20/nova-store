document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // AOS
    // =========================

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100
        });
    }


    // =========================
    // MOBILE MENU
    // =========================

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobileLink");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", function () {

            mobileMenu.classList.toggle("hidden");

            const isOpen =
                !mobileMenu.classList.contains("hidden");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            mobileMenu.classList.add("hidden");

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });
    });



    // =========================
    // SEARCH
    // =========================

    const searchButton =
        document.getElementById("searchButton");

    const searchBox =
        document.getElementById("searchBox");

    const searchInput =
        document.getElementById("searchInput");

    const productCards =
        document.querySelectorAll("#productGrid article");

    const searchNoResults =
        document.getElementById("searchNoResults");

    const searchResults =
        document.getElementById("searchResults");


    function resetSearch() {

        if (searchInput) {
            searchInput.value = "";
        }

        productCards.forEach(function (card) {
            card.classList.remove("hidden");
        });

        if (searchNoResults) {
            searchNoResults.classList.add("hidden");
        }

        if (searchResults) {
            searchResults.innerHTML = "";
            searchResults.classList.add("hidden");
        }
    }


    if (
        searchButton &&
        searchBox &&
        searchInput
    ) {

        searchButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    searchBox.classList.contains("max-h-40");


                if (isOpen) {

                    searchBox.classList.remove(
                        "max-h-40",
                        "opacity-100"
                    );

                    searchBox.classList.add(
                        "max-h-0",
                        "opacity-0"
                    );

                    resetSearch();

                } else {

                    searchBox.classList.remove(
                        "max-h-0",
                        "opacity-0"
                    );

                    searchBox.classList.add(
                        "max-h-40",
                        "opacity-100"
                    );

                    setTimeout(function () {
                        searchInput.focus();
                    }, 200);

                }

            }
        );


        searchInput.addEventListener(
            "input",
            function () {

                const searchTerm =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                let visibleProducts = 0;


                if (searchResults) {
                    searchResults.innerHTML = "";
                }


                productCards.forEach(
                    function (card) {

                        const productName =
                            card
                                .querySelector("h3")
                                .textContent
                                .toLowerCase();


                        if (
                            productName.includes(searchTerm)
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                            visibleProducts++;

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );


                if (searchNoResults) {

                    searchNoResults.classList.toggle(
                        "hidden",
                        visibleProducts !== 0 ||
                        searchTerm === ""
                    );

                }


                // SEARCH RESULTS DROPDOWN

                if (searchResults) {

                    if (searchTerm === "") {

                        searchResults.classList.add(
                            "hidden"
                        );

                    } else {

                        const matchingProducts = [];


                        productCards.forEach(
                            function (card) {

                                const name =
                                    card
                                        .querySelector("h3")
                                        .textContent
                                        .trim();

                                const category =
                                    card
                                        .querySelector("p")
                                        .textContent
                                        .trim();


                                const lowerName =
                                    name.toLowerCase();

                                const lowerCategory =
                                    category.toLowerCase();


                                if (
                                    lowerName.includes(searchTerm) ||
                                    lowerCategory.includes(searchTerm)
                                ) {

                                    matchingProducts.push({
                                        name: name,
                                        category: category
                                    });

                                }

                            }
                        );


                        if (
                            matchingProducts.length === 0
                        ) {

                            searchResults.innerHTML = `
                                <div class="px-5 py-4 text-sm text-gray-500">
                                    No matching products found.
                                </div>
                            `;

                        } else {

                            matchingProducts.forEach(
                                function (product) {

                                    const result =
                                        document.createElement(
                                            "button"
                                        );


                                    result.type = "button";

                                    result.className =
                                        "w-full text-left px-5 py-4 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0";


                                    result.innerHTML = `
                                        <span class="block font-medium">
                                            ${product.name}
                                        </span>

                                        <span class="block text-xs text-gray-500 mt-1">
                                            ${product.category}
                                        </span>
                                    `;


                                    result.addEventListener(
                                        "click",
                                        function () {

                                            searchInput.value =
                                                product.name;

                                            searchResults.classList.add(
                                                "hidden"
                                            );


                                            productCards.forEach(
                                                function (card) {

                                                    const cardName =
                                                        card
                                                            .querySelector("h3")
                                                            .textContent
                                                            .toLowerCase();


                                                    card.classList.toggle(
                                                        "hidden",
                                                        !cardName.includes(
                                                            product.name.toLowerCase()
                                                        )
                                                    );

                                                }
                                            );


                                            const productsSection =
                                                document.getElementById(
                                                    "products"
                                                );


                                            if (productsSection) {

                                                productsSection.scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start"
                                                });

                                            }

                                        }
                                    );


                                    searchResults.appendChild(
                                        result
                                    );

                                }
                            );

                        }


                        searchResults.classList.remove(
                            "hidden"
                        );

                    }

                }

            }
        );

    }



    // =========================
    // VIEW ALL PRODUCTS
    // =========================

    const viewAllButton =
        document.getElementById("viewAllButton");


    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            function () {

                resetSearch();


                const productsSection =
                    document.getElementById("products");


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }



    // =========================
    // CART
    // =========================

    let cart = [];


    const cartCount =
        document.getElementById("cartCount");

    const cartButton =
        document.getElementById("cartButton");

    const cartDrawer =
        document.getElementById("cartDrawer");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const closeCart =
        document.getElementById("closeCart");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartItemCount =
        document.getElementById("cartItemCount");

    const addToCartButtons =
        document.querySelectorAll(".addToCart");


    function openCart() {

        if (!cartDrawer || !cartOverlay) {
            return;
        }

        cartDrawer.classList.remove(
            "translate-x-full"
        );

        cartOverlay.classList.remove(
            "hidden"
        );

    }


    function closeCartDrawer() {

        if (!cartDrawer || !cartOverlay) {
            return;
        }

        cartDrawer.classList.add(
            "translate-x-full"
        );

        cartOverlay.classList.add(
            "hidden"
        );

    }


    function updateCart() {

        if (!cartItems) {
            return;
        }


        cartItems.innerHTML = "";

        let total = 0;
        let itemCount = 0;


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-center">

                    <div class="text-5xl mb-5">
                        🛒
                    </div>

                    <h3 class="text-lg font-semibold">
                        Your cart is empty
                    </h3>

                    <p class="text-sm text-gray-500 mt-2">
                        Add some products to get started.
                    </p>

                </div>
            `;


            if (cartCount) {
                cartCount.textContent = "0";
            }

            if (cartItemCount) {
                cartItemCount.textContent = "0";
            }

            if (cartTotal) {
                cartTotal.textContent = "$0.00";
            }

            return;
        }


        cart.forEach(function (item, index) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;
            itemCount += item.quantity;


            const cartItem =
                document.createElement("div");


            cartItem.className =
                "border-b py-5";


            cartItem.innerHTML = `
                <div class="flex justify-between gap-4">

                    <div class="flex-1">

                        <h3 class="font-semibold text-sm">
                            ${item.name}
                        </h3>

                        <p class="text-sm text-gray-500 mt-1">
                            $${item.price}
                        </p>

                        <div class="flex items-center gap-3 mt-4">

                            <button
                                class="decreaseQuantity w-8 h-8 border rounded-lg hover:bg-gray-100"
                                data-index="${index}"
                                type="button"
                            >
                                −
                            </button>

                            <span class="text-sm font-medium">
                                ${item.quantity}
                            </span>

                            <button
                                class="increaseQuantity w-8 h-8 border rounded-lg hover:bg-gray-100"
                                data-index="${index}"
                                type="button"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <div class="text-right">

                        <p class="font-semibold">
                            $${itemTotal.toFixed(2)}
                        </p>

                        <button
                            class="removeItem text-xs text-red-500 hover:text-red-700 mt-3"
                            data-index="${index}"
                            type="button"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;


            cartItems.appendChild(cartItem);

        });


        if (cartCount) {
            cartCount.textContent =
                String(itemCount);
        }

        if (cartItemCount) {
            cartItemCount.textContent =
                String(itemCount);
        }

        if (cartTotal) {
            cartTotal.textContent =
                `$${total.toFixed(2)}`;
        }


        // INCREASE

        document
            .querySelectorAll(".increaseQuantity")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (cart[index]) {

                            cart[index].quantity++;

                            updateCart();

                        }

                    }
                );

            });


        // DECREASE

        document
            .querySelectorAll(".decreaseQuantity")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (!cart[index]) {
                            return;
                        }


                        if (
                            cart[index].quantity > 1
                        ) {

                            cart[index].quantity--;

                        } else {

                            cart.splice(
                                index,
                                1
                            );

                        }


                        updateCart();

                    }
                );

            });


        // REMOVE

        document
            .querySelectorAll(".removeItem")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset.index
                            );


                        if (cart[index]) {

                            cart.splice(
                                index,
                                1
                            );

                            updateCart();

                        }

                    }
                );

            });

    }



    // =========================
    // ADD TO CART
    // =========================

    addToCartButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productName =
                        this.dataset.product;


                    const productPrice =
                        Number(
                            this.dataset.price
                        );


                    const existingProduct =
                        cart.find(
                            function (item) {

                                return (
                                    item.name ===
                                    productName
                                );

                            }
                        );


                    if (existingProduct) {

                        existingProduct.quantity++;

                    } else {

                        cart.push({
                            name: productName,
                            price: productPrice,
                            quantity: 1
                        });

                    }


                    updateCart();

                    openCart();

                }
            );

        }
    );



    // CART BUTTON

    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }



    // CLOSE CART

    if (closeCart) {

        closeCart.addEventListener(
            "click",
            closeCartDrawer
        );

    }



    // OVERLAY

    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCartDrawer
        );

    }



    // =========================
    // NEWSLETTER
    // =========================

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const newsletterEmail =
                    document.getElementById(
                        "newsletterEmail"
                    );


                const email =
                    newsletterEmail
                        ? newsletterEmail.value
                        : "";


                alert(
                    `Thanks for subscribing, ${email}!`
                );


                newsletterForm.reset();

            }
        );

    }



    // =========================
    // DEMO CHECKOUT
    // =========================

    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );

    const checkoutModal =
        document.getElementById(
            "checkoutModal"
        );

    const closeCheckout =
        document.getElementById(
            "closeCheckout"
        );

    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );

    const checkoutProducts =
        document.getElementById(
            "checkoutProducts"
        );

    const checkoutQuantity =
        document.getElementById(
            "checkoutQuantity"
        );

    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );

    const demoConfirmation =
        document.getElementById(
            "demoConfirmation"
        );

    const closeConfirmation =
        document.getElementById(
            "closeConfirmation"
        );



    function openCheckout() {

        if (
            !checkoutModal ||
            !checkoutProducts
        ) {
            return;
        }


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        checkoutProducts.innerHTML = "";


        let totalQuantity = 0;
        let totalPrice = 0;


        cart.forEach(function (item) {

            const itemTotal =
                item.price *
                item.quantity;


            totalQuantity +=
                item.quantity;


            totalPrice +=
                itemTotal;


            const product =
                document.createElement("div");


            product.className =
                "flex justify-between gap-4 text-sm border-b pb-3";


            product.innerHTML = `
                <div>

                    <p class="font-medium">
                        ${item.name}
                    </p>

                    <p class="text-gray-500 mt-1">
                        Quantity: ${item.quantity}
                    </p>

                </div>

                <p class="font-semibold">
                    $${itemTotal.toFixed(2)}
                </p>
            `;


            checkoutProducts.appendChild(
                product
            );

        });


        if (checkoutQuantity) {

            checkoutQuantity.textContent =
                String(totalQuantity);

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                `$${totalPrice.toFixed(2)}`;

        }


        checkoutModal.classList.remove(
            "hidden"
        );

    }



    function closeCheckoutModal() {

        if (checkoutModal) {

            checkoutModal.classList.add(
                "hidden"
            );

        }

    }



    // OPEN CHECKOUT

    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            openCheckout
        );

    }



    // CLOSE CHECKOUT

    if (closeCheckout) {

        closeCheckout.addEventListener(
            "click",
            closeCheckoutModal
        );

    }



    // SUBMIT CHECKOUT

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                checkoutForm.classList.add(
                    "hidden"
                );


                if (demoConfirmation) {

                    demoConfirmation.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    }



    // CLOSE CONFIRMATION

    if (closeConfirmation) {

        closeConfirmation.addEventListener(
            "click",
            function () {

                if (checkoutModal) {

                    checkoutModal.classList.add(
                        "hidden"
                    );

                }


                if (checkoutForm) {

                    checkoutForm.reset();

                    checkoutForm.classList.remove(
                        "hidden"
                    );

                }


                if (demoConfirmation) {

                    demoConfirmation.classList.add(
                        "hidden"
                    );

                }


                cart = [];

                updateCart();

            }
        );

    }



    // CHECKOUT BACKDROP

    if (checkoutModal) {

        checkoutModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    checkoutModal
                ) {

                    closeCheckoutModal();

                }

            }
        );

    }



    // =========================
    // CONTACT DEMO
    // =========================

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                alert(
                    "This is a portfolio demo. No real message was sent."
                );


                contactForm.reset();

            }
        );

    }



    // =========================
    // FOOTER YEAR
    // =========================

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});