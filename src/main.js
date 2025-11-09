async function loadComponent(id, url) {
  const container = document.getElementById(id);
  if (!container) return; // Skip if this component isn't needed on the page

  try {
    const response = await fetch(url);
    const html = await response.text();
    container.innerHTML = html;

    // Execute scripts in the loaded HTML
    const scripts = container.querySelectorAll("script");
    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");
      newScript.textContent = oldScript.textContent;
      document.body.appendChild(newScript);
      document.body.removeChild(newScript);
    });

    // If the header is loaded, initialize the menu behavior
    if (id === 'header') {
      initializeMenu();
    }
  } catch (err) {
    console.error(`Failed to load ${url} into #${id}:`, err);
  }
}

function initializeMenu() {
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuIcon && closeIcon && mobileMenu) {
    menuIcon.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      closeIcon.classList.remove("hidden");
      menuIcon.classList.add("hidden");
    });

    closeIcon.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      closeIcon.classList.add("hidden");
      menuIcon.classList.remove("hidden");
    });
  }
}

// Load components when the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "src/sections/header.html");
  loadComponent("hero", "src/sections/hero.html");
  loadComponent("yellowContent", "src/sections/yellowContent.html");
  loadComponent("main-content", "src/sections/main-content.html");
  loadComponent("footer", "src/sections/footer.html");
});


