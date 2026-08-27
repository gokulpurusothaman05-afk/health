/* ==========================================================================
   STACKLY - DASHBOARD INTERACTIVITY ENGINE (Light Theme Edition)
   Static Sidebar • Independent Right-Side Scroll • 320px Mobile Ready
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initDashboardCharts();
  initDynamicTables();
});

/* --- Sidebar Active Link Switching, Drawer Toggle & Smooth Scroll --- */
function initDashboardSidebar() {
  const sidebarLinks = document.querySelectorAll('.sidebar-item');
  const sectionBlocks = document.querySelectorAll('.dash-section-block');
  const toggleBtn = document.querySelector('.dash-toggle-btn');
  const closeBtn = document.querySelector('.sidebar-close-btn');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const sidebar = document.querySelector('.dash-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      if (backdrop) {
        backdrop.classList.toggle('is-active', sidebar.classList.contains('is-open'));
      }
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
    });
  }

  if (backdrop && sidebar) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      backdrop.classList.remove('is-active');
    });
  }

  if (!sidebarLinks.length) return;

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();

        // 1. Update active class in sidebar immediately
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // 2. Scroll the right pane to that section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

        // Close mobile drawer if open
        if (sidebar && sidebar.classList.contains('is-open')) {
          sidebar.classList.remove('is-open');
          if (backdrop) backdrop.classList.remove('is-active');
        }
      }
    });
  });

  // Track active section as right pane is scrolled
  const scrollContainer = document.querySelector('.dash-right-wrapper');
  if (scrollContainer && sectionBlocks.length) {
    scrollContainer.addEventListener('scroll', () => {
      let currentSectionId = '';
      const containerTop = scrollContainer.scrollTop;

      sectionBlocks.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (containerTop >= sectionTop) {
          currentSectionId = '#' + section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        sidebarLinks.forEach(link => {
          if (link.getAttribute('href') === currentSectionId) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }
}

/* --- Render Dashboard Charts with Chart.js (Light Mode) --- */
function initDashboardCharts() {
  if (typeof Chart === 'undefined') return;

  // 1. Client ICU & Ventilator Chart
  const clientIcuCtx = document.getElementById('client-icu-chart');
  if (clientIcuCtx) {
    new Chart(clientIcuCtx, {
      type: 'bar',
      data: {
        labels: ['Main ICU', 'Cardiac', 'Neuro', 'Pediatric', 'Neonatal', 'Emergency'],
        datasets: [
          {
            label: 'Occupied Beds',
            data: [42, 28, 18, 14, 12, 35],
            backgroundColor: '#0284c7',
            borderRadius: 6
          },
          {
            label: 'Available Beds',
            data: [8, 4, 6, 6, 8, 15],
            backgroundColor: '#e0f2fe',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#334155', boxWidth: 12, font: { size: 11 } } } },
        scales: {
          x: { stacked: true, ticks: { color: '#64748b', font: { size: 10 } }, grid: { display: false } },
          y: { stacked: true, ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(226, 232, 240, 0.8)' } }
        }
      }
    });
  }

  // 2. Client Revenue Chart
  const clientRevenueCtx = document.getElementById('client-revenue-chart');
  if (clientRevenueCtx) {
    new Chart(clientRevenueCtx, {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Claims (₹ Lakhs)',
          data: [112, 135, 148, 162, 184, 195],
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.12)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#334155', boxWidth: 12, font: { size: 11 } } } },
        scales: {
          x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { display: false } },
          y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(226, 232, 240, 0.8)' } }
        }
      }
    });
  }

  // 3. Admin State-Wide Overview Chart
  const adminStateCtx = document.getElementById('admin-state-chart');
  if (adminStateCtx) {
    new Chart(adminStateCtx, {
      type: 'line',
      data: {
        labels: ['Chennai', 'CBE', 'MDU', 'TRY', 'SLM', 'TNV'],
        datasets: [
          {
            label: 'Patient Flow',
            data: [4200, 2800, 2100, 1600, 1400, 1100],
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.12)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Spike Index',
            data: [12, 28, 45, 14, 18, 9],
            borderColor: '#e11d48',
            borderDash: [5, 5],
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#334155', boxWidth: 12, font: { size: 11 } } } },
        scales: {
          x: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { display: false } },
          y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: 'rgba(226, 232, 240, 0.8)' } }
        }
      }
    });
  }

  // 4. Admin ABDM Health ID Ingestion Speed
  const adminAbdmCtx = document.getElementById('admin-abdm-chart');
  if (adminAbdmCtx) {
    new Chart(adminAbdmCtx, {
      type: 'doughnut',
      data: {
        labels: ['ABHA Records', 'CMCHIS Claims', 'NABH Quality', 'Tele-ICU Feeds'],
        datasets: [{
          data: [58, 24, 12, 6],
          backgroundColor: ['#0284c7', '#16a34a', '#f59e0b', '#8b5cf6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#334155', boxWidth: 10, font: { size: 10 } } } }
      }
    });
  }
}

function initDynamicTables() {
  const exportBtns = document.querySelectorAll('.btn-export-pdf');
  exportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Generating official Healthcare Analytics PDF Report (NABH & ABDM compliant)...');
    });
  });
}
