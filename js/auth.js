/* ==========================================================================
   STACKLY - AUTHENTICATION & SESSION MANAGER
   Login • Sign Up • Validation • Redirection
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAuthRoleSwitcher();
  initLoginForm();
  initSignupForm();
  syncUserProfileHeader();
});

function initAuthRoleSwitcher() {
  const roleTabs = document.querySelectorAll('.auth-tab-btn');
  const roleLabel = document.getElementById('auth-role-label');

  if (!roleTabs.length) return;

  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleTabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = 'transparent';
        t.style.color = 'var(--text-body)';
      });
      tab.classList.add('active');
      tab.style.background = 'var(--accent-cyan-light)';
      tab.style.color = 'var(--accent-cyan)';

      const role = tab.getAttribute('data-role');
      if (role === 'admin') {
        if (roleLabel) roleLabel.textContent = 'Tamil Nadu State Health Admin Control';
      } else {
        if (roleLabel) roleLabel.textContent = 'Hospital Doctor & Client Portal';
      }
    });
  });
}

function initLoginForm() {
  const form = document.getElementById('main-login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('login-username')?.value.trim();
    const emailInput = document.getElementById('login-email')?.value.trim();
    const passwordInput = document.getElementById('login-password')?.value;
    const activeRoleTab = document.querySelector('.auth-tab-btn.active');
    const role = activeRoleTab ? activeRoleTab.getAttribute('data-role') : 'client';

    if (!userInput || !emailInput || !passwordInput) {
      alert('Please fill in all required fields.');
      return;
    }

    let userName = userInput.startsWith('Dr.') ? userInput : 'Dr. ' + userInput;
    let email = emailInput;

    localStorage.setItem('stackly_user_name', userName);
    localStorage.setItem('stackly_user_email', email);
    localStorage.setItem('stackly_user_role', role);

    if (role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else {
      window.location.href = 'client-dashboard.html';
    }
  });
}

function initSignupForm() {
  const signupForm = document.getElementById('main-signup-form');
  if (!signupForm) return;

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('signup-username')?.value.trim();
    const emailInput = document.getElementById('signup-email')?.value.trim();
    const passwordInput = document.getElementById('signup-password')?.value;
    const confirmPasswordInput = document.getElementById('signup-confirm-password')?.value;

    if (!userInput || !emailInput || !passwordInput || !confirmPasswordInput) {
      alert('Please fill in all fields.');
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      alert('Passwords do not match! Please check your password.');
      return;
    }

    let userName = userInput.startsWith('Dr.') ? userInput : 'Dr. ' + userInput;
    let email = emailInput;

    localStorage.setItem('stackly_user_name', userName);
    localStorage.setItem('stackly_user_email', email);

    // Show alert and redirect to login page
    alert('Account created successfully for ' + userName + ' (' + email + ')!\nRedirecting to login portal...');
    window.location.href = 'login.html';
  });
}

function syncUserProfileHeader() {
  const storedName = localStorage.getItem('stackly_user_name') || 'Dr. Rajesh Kumar';
  const storedEmail = localStorage.getItem('stackly_user_email') || 'example@gmail.com';

  const nameElements = document.querySelectorAll('.user-display-name');
  const emailElements = document.querySelectorAll('.user-display-email');
  const avatarElements = document.querySelectorAll('.user-avatar-circle');

  nameElements.forEach(el => {
    if (el.tagName === 'INPUT') {
      el.value = storedName;
    } else {
      el.textContent = storedName;
    }
  });

  emailElements.forEach(el => {
    if (el.tagName === 'INPUT') {
      el.value = storedEmail;
    } else {
      el.textContent = storedEmail;
    }
  });

  let initials = 'DR';
  const cleanName = storedName.replace(/^Dr\.\s*/i, '').trim();
  const parts = cleanName.split(' ');
  if (parts.length >= 2 && parts[0] && parts[1]) {
    initials = (parts[0][0] + parts[1][0]).toUpperCase();
  } else if (cleanName) {
    initials = cleanName.substring(0, 2).toUpperCase();
  }

  avatarElements.forEach(el => {
    el.textContent = initials;
  });
}
