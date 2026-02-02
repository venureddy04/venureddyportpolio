'use strict';

const elementToggleFunc = function(elem) {
  elem.classList.toggle("active");
}

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {
  elementToggleFunc(sidebar);
});

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', function() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if(select) {
  select.addEventListener("click", function() {
    elementToggleFunc(this);
  });
}

for(let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function() {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function(selectedValue) {
  for(let i = 0; i < filterItems.length; i++) {
    if(selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if(selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];

for(let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function() {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for(let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function() {
    for(let i = 0; i < pages.length; i++) {
      if(this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

const blogTabs = document.querySelectorAll("[data-blog-tab]");
const blogContents = document.querySelectorAll("[data-blog-content]");

if(blogTabs.length > 0) {
  blogTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      const targetContent = this.getAttribute("data-blog-tab");
      blogTabs.forEach(t => t.classList.remove("active"));
      blogContents.forEach(c => c.classList.remove("active"));
      this.classList.add("active");
      document.querySelector(`[data-blog-content="${targetContent}"]`).classList.add("active");
    });
  });
}

window.addEventListener('load', function() {
  const skills = document.querySelectorAll('.skill-progress-fill');
  skills.forEach(skill => {
    const width = skill.style.width;
    skill.style.width = '0';
    setTimeout(() => {
      skill.style.width = width;
    }, 100);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.service-item, .cert-item, .update-item, .blog-post-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(item);
});