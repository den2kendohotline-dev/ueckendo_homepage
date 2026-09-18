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


  /* ========================
     RESULTS LOADING
  ======================== */

  const resultsLink = document.querySelector("#resultsLink");
  const resultsLoading = document.querySelector("#resultsLoading");

  if (resultsLink && resultsLoading) {

    resultsLink.addEventListener("click", async (event) => {

      event.preventDefault();

      const resultsUrl =
        "https://ueckendo-app.onrender.com/results";

      /* ローディング画面を表示 */
      resultsLoading.classList.add("active");
      resultsLoading.setAttribute("aria-hidden", "false");

      /* 背景スクロールを停止 */
      document.body.style.overflow = "hidden";


      const checkServer = async () => {

        try {

          await fetch(resultsUrl, {
            mode: "no-cors",
            cache: "no-store"
          });

          /*
            fetchが完了した時点でRenderが応答したと判断して
            試合結果ページへ移動
          */
          window.location.href = resultsUrl;

        } catch (error) {

          /*
            起動していなければ少し待って再確認
          */
          setTimeout(checkServer, 1500);

        }

      };

      checkServer();

    });

  }

});