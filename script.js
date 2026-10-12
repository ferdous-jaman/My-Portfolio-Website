/* ==========================================================================
   PORTFOLIO INTERACTIVITY SCRIPT — Md. Ferdous Jaman
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Typewriter Effect
  const typewriterElement = document.getElementById('typewriter');
  const words = [
    'Full-Stack Web Developer',
    'AI & Deep Learning Researcher',
    'Software Engineer',
    'Medical Image Analysis Specialist'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // 3. Theme Toggle (Dark / Light)
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('ferdous_theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ferdous_theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        showToast('Switched to Dark Obsidian mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('ferdous_theme', 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
        showToast('Switched to Light Clean mode');
      }
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    // Close when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // 5. Active Nav Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // 6. Interactive Stats Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          let count = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = isDecimal ? target.toFixed(2) : Math.round(target);
              clearInterval(timer);
            } else {
              stat.textContent = isDecimal ? count.toFixed(2) : Math.round(count);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 7. Research Publications Filter Tabs
  const pubFilterTabs = document.querySelectorAll('#pubFilters .filter-tab');
  const pubCards = document.querySelectorAll('.pub-card');

  pubFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pubFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      pubCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 8. Projects Filter Tabs
  const projectFilterTabs = document.querySelectorAll('#projectFilters .filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 9. BibTeX Citation Modal & Copy
  const bibModal = document.getElementById('bibModal');
  const bibContent = document.getElementById('bibContent');
  const closeBibModal = document.getElementById('closeBibModal');
  const copyBibBtn = document.getElementById('copyBibBtn');

  const bibData = {
    'elsevier-lung': `@article{jaman2026deep,
  title={Deep Learning-Based Binary Detection and Multiclass Subtyping of Non-Small Cell Lung Cancer with Model Interpretability},
  author={Jaman, Md. Ferdous and collaborators},
  journal={Informatics in Medicine Unlocked},
  publisher={Elsevier},
  year={2026},
  doi={10.1016/j.imu.2026.101789},
  note={Scopus Q1, CiteScore: 10.5}
}`,
    'ieee-qpain': `@inproceedings{jaman2026deeplungbalance,
  title={DeepLungBalance: Addressing Class Imbalance in Deep Learning-Based Lung Cancer Detection with Explainable AI and Prototype Deployment},
  author={Jaman, Md. Ferdous and collaborators},
  booktitle={IEEE Conference on Quantum, Predictive AI, and Intelligent Networks (QPAIN)},
  year={2026},
  publisher={IEEE},
  doi={10.1109/QPAIN69676.2026.11546617}
}`,
    'ieee-icecte': `@inproceedings{jaman2026breastcancer,
  title={Deep Learning-Based Breast Cancer Classification: A Comprehensive Study on Mammogram Images},
  author={Jaman, Md. Ferdous and collaborators},
  booktitle={IEEE International Conference on Electrical, Computer and Telecommunication Engineering (ICECTE)},
  year={2026},
  publisher={IEEE},
  doi={10.1109/ICECTE69292.2026.11429259}
}`,
    'ieee-becithcon-cardio': `@inproceedings{jaman2025cardio,
  title={A Robust Deep Learning Approach for Cardiovascular Disease Diagnosis Using ECG Image Analysis},
  author={Jaman, Md. Ferdous and collaborators},
  booktitle={IEEE BECITHCON},
  year={2025},
  publisher={IEEE},
  doi={10.1109/BECITHCON69222.2025.11504222}
}`,
    'ieee-becithcon-leukemia': `@inproceedings{jaman2025leukemia,
  title={Hybrid Deep Learning with Uncertainty Quantification for Detection of Acute Lymphoblastic Leukemia},
  author={Jaman, Md. Ferdous and collaborators},
  booktitle={IEEE BECITHCON},
  year={2025},
  publisher={IEEE},
  doi={10.1109/BECITHCON69222.2025.11504220}
}`,
    'ieee-peccii-stroke': `@inproceedings{jaman2026deepstroke,
  title={DeepStrokeGuard: Explainable and Deployable Deep Learning for Brain Stroke Detection with Class Imbalance Handling},
  author={Jaman, Md. Ferdous and collaborators},
  booktitle={IEEE PECCII},
  year={2026},
  publisher={IEEE},
  doi={10.1109/PECCII70991.2026.11661895}
}`
  };

  document.querySelectorAll('.open-bib-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pubId = btn.getAttribute('data-pub-id');
      const bibText = bibData[pubId] || 'Citation data unavailable.';
      if (bibContent && bibModal) {
        bibContent.textContent = bibText;
        bibModal.classList.add('active');
      }
    });
  });

  if (closeBibModal && bibModal) {
    closeBibModal.addEventListener('click', () => {
      bibModal.classList.remove('active');
    });

    bibModal.addEventListener('click', (e) => {
      if (e.target === bibModal) {
        bibModal.classList.remove('active');
      }
    });
  }

  if (copyBibBtn && bibContent) {
    copyBibBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibContent.textContent).then(() => {
        showToast('BibTeX citation copied to clipboard!');
      });
    });
  }

  // 10. Copy Quick Buttons (Email, Phone)
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy');
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`Copied "${val}" to clipboard!`);
        });
      }
    });
  });

  // 11. Interactive Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Sending message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully.');
      }, 1200);
    });
  }

  // 12. Toast Notification Helper
  function showToast(msg) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
