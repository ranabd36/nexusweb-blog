window.onload = function () {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";

  const content = document.getElementById("content");
  content?.classList.remove("opacity-0");
  content?.classList.add("opacity-100");

  const toggleButton = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  if (localStorage.getItem("theme") === "dark") {
    htmlElement.classList.add("dark");
  }

  toggleButton.addEventListener("click", () => {
    htmlElement.classList.toggle("dark");

    if (htmlElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
  });

  const burgerMenuButton = document.getElementById("menu-toggle");
  const closeMenuButton = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  burgerMenuButton.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    htmlElement.style.overflow = "hidden";
  });

  closeMenuButton.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    htmlElement.style.overflow = "";
  });

  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("search-input");
  const resultsList = document.getElementById("results");

  openModal?.addEventListener("click", () => {
    searchModal?.classList.remove("hidden");
    searchInput.value = "";
    searchInput?.focus();
    resultsList.innerHTML = "";
  });

  closeModal?.addEventListener("click", () => {
    searchModal?.classList.add("hidden");
  });

  // Optionally, close the modal when clicking outside of it
  window.addEventListener("click", (e) => {
    if (e.target == searchModal) {
      searchModal?.classList.add("hidden");
    }
  });

  searchInput?.addEventListener("input", function () {
    const query = this.value.trim();
    const baseUrl = document
      .querySelector('meta[name="base-url"]')
      ?.getAttribute("content");
    if (query.length >= 3) {
      fetch(baseUrl + "index.json")
        .then((response) => response.json())
        .then((data) => {
          const results = data.filter((doc) =>
            doc.title.toLowerCase().includes(query.toLowerCase())
          );
          resultsList.innerHTML = "";
          resultsList.classList.remove("hidden");

          if (results.length > 0) {
            results.forEach((result) => {
              const div = document.createElement("div");
              div.className = "";
              div.innerHTML = `<a href="${result.url}" class="block">
                                <span class="text-gray-200 font-semibold">${
                                  result.title
                                }</span>
                                <p class="text-sm text-gray-400">${result.content.substring(
                                  0,
                                  100
                                )}...</p>
                              </a>`;
              resultsList.appendChild(div);
            });
          } else {
            const li = document.createElement("li");
            div.className = "p-2 text-gray-600";
            div.textContent = "No results found";
            resultsList.appendChild(div);
          }
        });
    } else {
      document.getElementById("results").classList.add("hidden");
    }
  });
};
