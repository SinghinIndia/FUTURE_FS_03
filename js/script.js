window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger);

const slices = gsap.utils.toArray(".slice");
const endText = document.querySelector(".end-text");
const orderBtn = document.querySelector(".order");

// initial states
gsap.set(slices, { opacity: 1 });
gsap.set(endText, { opacity: 0, y: 100 });
gsap.set(orderBtn, { opacity: 0, y: 100 });


gsap.set(endText, { opacity: 0, y: 100 });
gsap.set(orderBtn, { opacity: 0, y: 100 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pizza-section",
    start: "top top",
   end: "+=" + slices.length * 300,
    scrub: true,
    pin: true
  }
});

slices.forEach((slice, index) => {
  tl.to(slice, {
    opacity: 0,
    y: -50,       // gives a little upward "remove" motion
    duration: 1,
    ease: "power1.out"
  });
});

// 📝 show text AFTER all slices are gone
tl.to(endText, {
  opacity: 1,
  y: 0,               // final position
  duration: 1.2,
  ease: "back.out(1.7)"  // nice springy slide effect
});
tl.to(orderBtn, {
  opacity: 1,
  y: 0,               // slide to its fixed position
  duration: 1,
  ease: "back.out(1.7)"
}, "-=0.8");           // overlaps slightly with text animation

