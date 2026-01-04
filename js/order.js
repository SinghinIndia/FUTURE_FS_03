const dishes = [
  {
    name: "Truffle Mushroom Delight",
    price: "₹249",
    image: "images/pizza1.png",
    bg: "linear-gradient(135deg,#f7971e, #ffd200)"
  },
  {
    name: "BBQ Chicken Pizza",
    price: "₹349",
    image: "images/pizza2.png",
    bg: "linear-gradient(135deg,#FF7E5F, #FEB47B)"
  },
  {
    name: "Roasted Chicken & Cheese",
    price: "₹399",
    image: "images/pizza3.png",
    bg: "linear-gradient(135deg, #56ab2f, #a8e063)"
  },
  {
    name: "Bread Stix",
    price: "₹199",
    image: "images/pizza4.png",
    bg: "linear-gradient(135deg, #41295a, #2f0743)"
  }
];

/* ==============================
   Background cross-fade system
================================ */
const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");
let activeBg = bg1;
let inactiveBg = bg2;

/* ==============================
   State
================================ */
let index = 0;
let animating = false;

/* ==============================
   Elements
================================ */
const nameEl = document.getElementById("dishName");
const priceEl = document.getElementById("dishPrice");
const imageEl = document.getElementById("dishImage");

document.getElementById("nextBtn").onclick = nextDish;
document.getElementById("prevBtn").onclick = prevDish;

/* ==============================
   Smooth background transition
================================ */
function smoothBackgroundChange(gradient) {
  inactiveBg.style.background = gradient;
  inactiveBg.classList.add("active");
  activeBg.classList.remove("active");

  // swap references
  [activeBg, inactiveBg] = [inactiveBg, activeBg];
}

/* ==============================
   Text animation + update
================================ */
function updateText(animationClass) {
  nameEl.className = "";
  priceEl.className = "";

  // restart animation
  void nameEl.offsetWidth;

  nameEl.textContent = dishes[index].name;
  priceEl.textContent = dishes[index].price;

  nameEl.classList.add(animationClass);
  priceEl.classList.add(animationClass);

  smoothBackgroundChange(dishes[index].bg);
}

/* ==============================
   NEXT dish (clockwise)
================================ */
function nextDish() {
  if (animating) return;
  animating = true;

  imageEl.className = "exit-next";

  setTimeout(() => {
    index = (index + 1) % dishes.length;
    imageEl.src = dishes[index].image;

    imageEl.className = "enter-next";
    updateText("text-next");

    setTimeout(() => {
      animating = false;
    }, 900);
  }, 900);
}

/* ==============================
   PREV dish (counter-clockwise)
================================ */
function prevDish() {
  if (animating) return;
  animating = true;

  imageEl.className = "exit-prev";

  setTimeout(() => {
    index = (index - 1 + dishes.length) % dishes.length;
    imageEl.src = dishes[index].image;

    imageEl.className = "enter-prev";
    updateText("text-prev");

    setTimeout(() => {
      animating = false;
    }, 900);
  }, 900);
}

/* ==============================
   Initial load
================================ */
imageEl.src = dishes[index].image;
bg1.style.background = dishes[index].bg;
bg1.classList.add("active");
updateText("text-next");
