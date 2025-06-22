export function initNavigation() {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav__links");

  if (menuBtn && navLinks) {
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtnIcon.className = navLinks.classList.contains("open")
        ? "ri-close-line"
        : "ri-menu-line";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtnIcon.className = "ri-menu-line";
      });
    });
  }
}

// Function to update navigation based on authentication state
export function updateNavigation() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navLinks = document.getElementById("nav__links");

  if (navLinks) {
    const loginLink = navLinks.querySelector('[data-action="login"]');
    const signupLink = navLinks.querySelector('[data-action="signup"]');
    const logoutLink = navLinks.querySelector('[onclick*="handleLogout"]');
    const addPropertyLink = navLinks.querySelector(
      'a[href="./owner/choses.html"]'
    );

    // إخفاء روابط تسجيل الدخول والتسجيل وإضافة العقار عند تسجيل الدخول
    if (loginLink)
      loginLink.parentElement.style.display = isLoggedIn ? "none" : "block";
    if (signupLink)
      signupLink.parentElement.style.display = isLoggedIn ? "none" : "block";
    if (addPropertyLink)
      addPropertyLink.parentElement.style.display = isLoggedIn
        ? "none"
        : "block";

    // إظهار زر تسجيل الخروج فقط عند تسجيل الدخول
    if (logoutLink)
      logoutLink.parentElement.style.display = isLoggedIn ? "block" : "none";
  }
}

// تحديث القائمة عند تحميل الصفحة وعند تغيير حالة تسجيل الدخول
document.addEventListener("DOMContentLoaded", updateNavigation);
window.addEventListener("storage", (e) => {
  if (e.key === "token") {
    updateNavigation();
  }
});

// Call updateNavigation when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  updateNavigation();
});
