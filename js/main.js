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

  if (header && menuButton) {
    menuButton.addEventListener("click", () => {
      header.classList.toggle("menu-open");
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header?.classList.remove("menu-open");
    });
  });


  /* ========================
     HEADER SCROLL
  ======================== */

  function updateHeader() {

    if (!header || !hero) {
      return;
    }

    const heroBottom = hero.offsetTop + hero.offsetHeight;

    if (window.scrollY >= heroBottom - 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader);
  window.addEventListener("resize", updateHeader);

  updateHeader();


  /* ========================
     RENDER PAGE LOADING
  ======================== */

  function setupRenderLink(links, loading, targetUrl) {

    if (!loading || links.length === 0) {
      return;
    }

    links.forEach((link) => {

      link.addEventListener("click", async (event) => {

        event.preventDefault();

        /* スマホメニューを閉じる */
        header?.classList.remove("menu-open");

        /* ローディング画面表示 */
        loading.classList.add("active");
        loading.setAttribute("aria-hidden", "false");

        /* 背景スクロール停止 */
        document.body.style.overflow = "hidden";


        const checkServer = async () => {

          try {

            await fetch(targetUrl, {
              mode: "no-cors",
              cache: "no-store"
            });

            /*
              Renderから応答が返ったら移動
            */
            window.location.href = targetUrl;

          } catch (error) {

            /*
              起動していなければ1.5秒後に再確認
            */
            setTimeout(checkServer, 1500);

          }

        };

        checkServer();

      });

    });
  }


  /* ========================
     RESULTS
  ======================== */

  const resultsLink = document.querySelector("#resultsLink");
  const resultsLoading = document.querySelector("#resultsLoading");

  setupRenderLink(
    resultsLink ? [resultsLink] : [],
    resultsLoading,
    "https://ueckendo-app.onrender.com/results"
  );


  /* ========================
     MEMBERS ONLY
  ======================== */

  const membersLinks =
    document.querySelectorAll(".members-only-link");

  const membersLoading =
    document.querySelector("#membersLoading");

  setupRenderLink(
    membersLinks,
    membersLoading,
    "https://ueckendo-app.onrender.com/members/login"
  );

});


/* ========================
   RESET LOADING
   ブラウザの「戻る」対策
======================== */

window.addEventListener("pageshow", () => {

  const resultsLoading =
    document.querySelector("#resultsLoading");

  const membersLoading =
    document.querySelector("#membersLoading");


  if (resultsLoading) {
    resultsLoading.classList.remove("active");
    resultsLoading.setAttribute("aria-hidden", "true");
  }

  if (membersLoading) {
    membersLoading.classList.remove("active");
    membersLoading.setAttribute("aria-hidden", "true");
  }

  document.body.style.overflow = "";

});

// NEWSをnews.htmlから取得して最新5件を表示
document.addEventListener("DOMContentLoaded", async () => {
  const homeNewsList = document.getElementById("home-news-list");

  // トップページ以外では実行しない
  if (!homeNewsList) return;

  try {
    const response = await fetch("news.html");

    if (!response.ok) {
      throw new Error("NEWSの取得に失敗しました");
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const newsItems = Array.from(
      doc.querySelectorAll(".news-page .news-item")
    );

    // 日付の新しい順に並べ替える
    newsItems.sort((a, b) => {
      const getDate = (item) => {
        const date = item.querySelector(".news-date").textContent.trim();
        return new Date(date.replace(/\./g, "/")).getTime();
      };

      return getDate(b) - getDate(a);
    });

    // 最新5件を表示
    newsItems.slice(0, 5).forEach(item => {
      homeNewsList.appendChild(item.cloneNode(true));
    });

  } catch (error) {
    console.error("NEWS読み込みエラー:", error);
    homeNewsList.textContent = "お知らせを読み込めませんでした。";
  }
});