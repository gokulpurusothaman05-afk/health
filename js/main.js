/* ==========================================================================
   STACKLY - LIGHT THEME FRONTEND ENGINE
   Tabs • Static Background • Mobile Nav • 404 Links
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMarketplaceTabs();
  initDataFabricTabs();
  initMobileNav();
  initHeaderScroll();
  initUnwantedLinksRedirect();
});

/* --- Agent Marketplace Tab Switcher --- */
function initMarketplaceTabs() {
  const tabs = document.querySelectorAll('.xc_tab_marketplace');
  const panes = document.querySelectorAll('.xc_tabs_marketplacewaapper .w-tab-pane');

  if (!tabs.length) return;

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('w--current'));
      panes.forEach(p => p.classList.remove('w--tab-active'));

      tab.classList.add('w--current');
      if (panes[index]) {
        panes[index].classList.add('w--tab-active');
      }
    });
  });
}

/* --- Healthcare Data Fabric Tab Switcher --- */
function initDataFabricTabs() {
  const tabs = document.querySelectorAll('.tab_datafabric');
  const panes = document.querySelectorAll('.xc_tabs_datafabricwaapper .w-tab-pane');

  if (!tabs.length) return;

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('w--current'));
      panes.forEach(p => p.classList.remove('w--tab-active'));

      tab.classList.add('w--current');
      if (panes[index]) {
        panes[index].classList.add('w--tab-active');
      }
    });
  });
}

/* --- Mobile Navigation Drawer --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile_toggle_btn');
  const navMenu = document.querySelector('.xc_navlinkswapper');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      toggleBtn.innerHTML = navMenu.classList.contains('is-open') 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}

/* --- Sticky Header Scroll --- */
function initHeaderScroll() {
  const header = document.querySelector('.xc_header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- 404 Redirection for Unwanted/Unlinked elements --- */
function initUnwantedLinksRedirect() {
  const links = document.querySelectorAll('a[href="#"], a[href=""]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
}
