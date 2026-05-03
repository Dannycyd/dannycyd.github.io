'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// --- HASH-BASED ROUTING ---

const PAGE_HASH_MAP = {
  '#about':    'about',
  '#resume':   'resume',
  '#portfolio':'portfolio',
  '#blog':     'blog',
  '#contact':  'contact',
  '':          'about'
};

const ICON_MAP  = { github: 'logo-github', demo: 'open-outline', paper: 'document-text-outline', video: 'play-circle-outline', docs: 'document-outline' };
const LABEL_MAP = { github: 'GitHub', demo: 'Live Demo', paper: 'Paper / Report', video: 'Video', docs: 'Documentation' };

function showMainPage(pageName) {
  document.getElementById('project-detail-page').classList.remove('active');

  pages.forEach(function (page) {
    page.classList.toggle('active', page.dataset.page === pageName);
  });

  navigationLinks.forEach(function (link) {
    link.classList.toggle('active', link.innerHTML.toLowerCase() === pageName);
  });

  window.scrollTo(0, 0);
}

function showProjectDetail(projectId) {
  var project = PROJECTS_DATA.find(function (p) { return p.id === projectId; });
  if (!project) { window.location.hash = 'portfolio'; return; }

  // Populate header
  document.getElementById('detail-category').textContent = project.categoryLabel;
  document.getElementById('detail-title').textContent    = project.title;

  // Hero image
  var heroImg = document.getElementById('detail-hero-img');
  heroImg.src = project.coverImage;
  heroImg.alt = project.title;

  // Summary & description
  document.getElementById('detail-summary').textContent     = project.summary;
  document.getElementById('detail-description').textContent = project.description;

  // Gallery
  var gallery = document.getElementById('detail-gallery');
  gallery.innerHTML = '';
  var imgs = project.images || [];

  if (imgs.length > 0) {
    imgs.forEach(function (src) {
      var div = document.createElement('div');
      div.className = 'gallery-item';
      div.innerHTML = '<img src="' + src + '" alt="' + project.title + '" loading="lazy">';
      gallery.appendChild(div);
    });
  } else {
    var cover = document.createElement('div');
    cover.className = 'gallery-item';
    cover.innerHTML = '<img src="' + project.coverImage + '" alt="' + project.title + '" loading="lazy">';
    gallery.appendChild(cover);
    for (var p = 0; p < 2; p++) {
      var ph = document.createElement('div');
      ph.className = 'gallery-placeholder';
      ph.innerHTML = '<div class="gallery-placeholder-content"><ion-icon name="image-outline"></ion-icon><span>Photo coming soon</span></div>';
      gallery.appendChild(ph);
    }
  }

  // 3D Model
  var modelWrapper = document.getElementById('detail-model');
  modelWrapper.innerHTML = '';
  if (project.modelUrl) {
    modelWrapper.innerHTML =
      '<model-viewer' +
        ' src="'    + project.modelUrl + '"' +
        ' alt="'    + project.title + ' 3D Model"' +
        ' camera-controls' +
        ' auto-rotate' +
        ' auto-rotate-delay="600"' +
        ' rotation-per-second="10deg"' +
        ' environment-image="https://modelviewer.dev/shared-assets/environments/moon_1k.hdr"' +
        ' shadow-intensity="1.8"' +
        ' shadow-softness="1"' +
        ' exposure="0.6"' +
        ' tone-mapping="neutral"' +
        ' camera-orbit="30deg 68deg auto"' +
        ' interaction-prompt="none"' +
        ' style="background: radial-gradient(ellipse at 50% 38%, hsl(240,4%,22%) 0%, hsl(240,2%,8%) 72%);"' +
        ' class="project-model-viewer-element">' +
      '</model-viewer>';
  } else {
    modelWrapper.innerHTML =
      '<div class="model-placeholder">' +
        '<ion-icon name="cube-outline"></ion-icon>' +
        '<p>3D model coming soon</p>' +
      '</div>';
  }

  // Show model section in place of hero image when modelUrl exists
  var heroDiv      = document.querySelector('.project-detail-hero');
  var modelSection = document.getElementById('model-section');
  if (project.modelUrl) {
    heroDiv.style.display    = 'none';
    modelSection.style.display = '';
  } else {
    heroDiv.style.display    = '';
    modelSection.style.display = 'none';
  }

  // STEP file download button
  var existingStepBtn = document.getElementById('step-download-btn');
  if (existingStepBtn) existingStepBtn.remove();
  if (project.stepFileUrl) {
    var stepBtn = document.createElement('a');
    stepBtn.id        = 'step-download-btn';
    stepBtn.href      = project.stepFileUrl;
    stepBtn.download  = '';
    stepBtn.className = 'download-step-btn';
    stepBtn.innerHTML = '<ion-icon name="download-outline"></ion-icon><span>Download STEP File</span>';
    modelSection.appendChild(stepBtn);
  }

  // Technologies
  var techList = document.getElementById('detail-technologies');
  techList.innerHTML = '';
  (project.technologies || []).forEach(function (tech) {
    var li = document.createElement('li');
    li.className = 'tech-tag';
    li.textContent = tech;
    techList.appendChild(li);
  });

  // Links
  var linksSection   = document.getElementById('links-section');
  var linksContainer = document.getElementById('detail-links');
  var linkEntries    = Object.entries(project.links || {});
  linksContainer.innerHTML = '';

  if (linkEntries.length === 0) {
    linksSection.style.display = 'none';
  } else {
    linksSection.style.display = '';
    linkEntries.forEach(function (entry) {
      var key = entry[0], url = entry[1];
      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'project-detail-link';
      a.innerHTML =
        '<ion-icon name="' + (ICON_MAP[key] || 'open-outline') + '"></ion-icon>' +
        '<span>' + (LABEL_MAP[key] || key) + '</span>';
      linksContainer.appendChild(a);
    });
  }

  // Show detail page, hide main pages, keep Portfolio nav active
  pages.forEach(function (page) { page.classList.remove('active'); });
  navigationLinks.forEach(function (link) {
    link.classList.toggle('active', link.innerHTML.toLowerCase() === 'portfolio');
  });
  document.getElementById('project-detail-page').classList.add('active');

  window.scrollTo(0, 0);
}

function handleRouting() {
  var hash = window.location.hash;

  if (hash.startsWith('#project/')) {
    showProjectDetail(hash.slice(9));
    return;
  }

  var pageName = PAGE_HASH_MAP[hash] !== undefined ? PAGE_HASH_MAP[hash] : 'about';
  showMainPage(pageName);
}

// Nav links update the hash; hashchange calls handleRouting
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    var target = '#' + this.innerHTML.toLowerCase();
    if (window.location.hash !== target) {
      window.location.hash = this.innerHTML.toLowerCase();
    } else {
      handleRouting();
    }
  });
}

// Back button
document.getElementById('back-to-portfolio').addEventListener('click', function () {
  window.location.hash = 'portfolio';
});

// Listen for hash changes (covers browser back/forward too)
window.addEventListener('hashchange', handleRouting);

// Handle hash present on initial page load
if (window.location.hash) {
  handleRouting();
}