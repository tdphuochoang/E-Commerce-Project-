const cartBtn = document.getElementById("cart-btn");
const orderBtn = document.getElementById("order-btn");
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
let sliders = document.querySelectorAll(".glider");

const handleLogin = () => {};

const handleSlider = () => {
  for (let i = 0; i < sliders.length; i++) {
    let glider = new Glider(sliders[i], {
      slidesToShow: 4,
      slidesToScroll: 1,
      draggable: true,
      dots: ".dots",
      arrows: {
        prev: `.glider-prev${i}`,
        next: `.glider-next${i}`,
      },
    });
  }
};

handleSlider();
