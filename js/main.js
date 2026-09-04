document.addEventListener("DOMContentLoaded", () => {

  /* ========================
     MEMBER SLIDER
  ======================== */

  document.querySelectorAll(".grade-block").forEach((gradeBlock) => {

    const slider = gradeBlock.querySelector(".member-slider");
    const prevButton = gradeBlock.querySelector(".member-prev");
    const nextButton = gradeBlock.querySelector(".member-next");

    if (!slider || !prevButton || !nextButton) {
      return;
    }

    const getScrollAmount = () => {

      const card = slider.querySelector(".member-card");

      if (!card) {
        return 0;
      }

      const gap = 20;

      return card.offsetWidth + gap;
    };


    nextButton.addEventListener("click", () => {

      slider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });

    });


    prevButton.addEventListener("click", () => {

      slider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });

    });

  });



  /* ========================
     HEADER
  ======================== */

  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");

  const menuButton = document.querySelector(".menu-button");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");


  /* ハンバーガーメニュー */

  if (header && menuButton) {

    menuButton.addEventListener("click", () => {

      header.classList.toggle("menu-open");

    });

  }


  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      header.classList.remove("menu-open");

    });

  });



  /* ========================
     HEADER SCROLL
  ======================== */

  function updateHeader() {

    if (!header || !hero) {
      return;
    }

    const heroBottom =
      hero.offsetTop + hero.offsetHeight;

    if (window.scrollY >= heroBottom - 80) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  window.addEventListener("scroll", updateHeader);

  window.addEventListener("resize", updateHeader);


  /* 読み込み時にも一度判定 */

  updateHeader();

});