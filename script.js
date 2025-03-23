let cart = []; // آرایه برای ذخیره سبد خرید

// دکمه‌های افزودن به سبد خرید
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');

// تابع برای بروزرسانی شمارش سبد خرید
function updateCart() {
    // شمارش تعداد محصولات در سبد خرید
    const totalItems = cart.length;
    cartCount.textContent = totalItems;

    // نمایش محتوای سبد خرید
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name} - ${item.price} تومان</p>
            <button class="remove-from-cart" data-id="${item.id}">حذف</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        totalPrice += item.price;
    });

    // بروزرسانی مجموع قیمت
    cartTotalPrice.textContent = totalPrice.toLocaleString() + ' تومان';
}

// افزودن محصول به سبد خرید
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseInt(product.dataset.price);

        // بررسی اینکه محصول قبلاً در سبد خرید هست یا نه
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            alert('این محصول قبلاً به سبد خرید شما اضافه شده است.');
            return;
        }

        // افزودن محصول جدید به سبد خرید
        cart.push({ id: productId, name: productName, price: productPrice });
        updateCart();
    });
});

// نمایش سبد خرید
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

// بستن سبد خرید
closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// حذف محصول از سبد خرید
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.dataset.id;
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
});

// پرداخت (شبیه‌سازی)
checkoutButton.addEventListener('click', () => {
    alert('پرداخت با موفقیت انجام شد!');
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});

const buttons = document.querySelectorAll('.add-to-cart');
const shopNowButton = document.querySelector('.shop-now');

// انیمیشن دکمه "خرید کن"
shopNowButton.addEventListener('click', () => {
    alert("به فروشگاه خوش آمدید! به جستجو بپردازید.");
});

// انیمیشن افزودن به سبد خرید
buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.textContent = 'افزوده شد!';
        button.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            button.textContent = 'افزودن به سبد خرید';
            button.style.backgroundColor = '#ff6f00';
        }, 2000);
    });
});
