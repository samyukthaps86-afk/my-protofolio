/**
 * Samyuktha PS - Portfolio Website
 * Interactive Logic: Theme Switcher, Mobile Navigation, Scrollspy,
 * Skill Filters, Project Modals, Interactive Assistant Chat & Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. THEME SWITCHER (Dark & Light Mode with Persistence)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function getInitialTheme() {
    const savedTheme = localStorage.getItem('samyuktha_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('samyuktha_theme', theme);
  }

  // Set initial theme
  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Listen for OS theme changes if user hasn't explicitly set a preference
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('samyuktha_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });


  // =========================================================================
  // 2. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent scrolling when drawer is open
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggleBtn && mobileDrawer && drawerBackdrop) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    drawerBackdrop.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }


  // =========================================================================
  // 3. SCROLLSPY (Active Navigation Links based on Scroll Position)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();


  // =========================================================================
  // 4. DYNAMIC TAGLINE ROTATION (HERO)
  // =========================================================================
  const dynamicTaglineEl = document.getElementById('dynamic-tagline');
  if (dynamicTaglineEl) {
    const taglines = [
      'robust software systems & data pipelines',
      'interactive web applications & clean code',
      'automated IoT microcontroller hardware',
      'algorithmic data structures & solutions'
    ];
    let taglineIndex = 0;

    setInterval(() => {
      taglineIndex = (taglineIndex + 1) % taglines.length;
      dynamicTaglineEl.style.opacity = '0';
      dynamicTaglineEl.style.transform = 'translateY(4px)';
      dynamicTaglineEl.style.transition = 'all 0.3s ease';

      setTimeout(() => {
        dynamicTaglineEl.textContent = taglines[taglineIndex];
        dynamicTaglineEl.style.opacity = '1';
        dynamicTaglineEl.style.transform = 'translateY(0)';
      }, 300);
    }, 4000);
  }


  // =========================================================================
  // 5. ABOUT SECTION AVATAR SWITCHER (Photo vs Pixel Art)
  // =========================================================================
  const heroProfileImg = document.querySelector('.hero-profile-img');
  const btnShowPhoto = document.getElementById('btn-show-photo');
  const btnShowPixel = document.getElementById('btn-show-pixel');

  if (heroProfileImg && btnShowPhoto && btnShowPixel) {
    btnShowPhoto.addEventListener('click', () => {
      heroProfileImg.src = 'profile.jpg';
      btnShowPhoto.classList.add('active');
      btnShowPixel.classList.remove('active');
    });

    btnShowPixel.addEventListener('click', () => {
      heroProfileImg.src = 'pixel_avatar.jpg';
      btnShowPixel.classList.add('active');
      btnShowPhoto.classList.remove('active');
    });
  }


  // =========================================================================
  // 6. SKILLS CATEGORY FILTERING
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  if (filterTabs.length && skillCards.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Toggle active button
        filterTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const filterValue = tab.getAttribute('data-filter');

        skillCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || cardCategories.includes(filterValue)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }


  // =========================================================================
  // 7. PROJECT DETAILS MODAL
  // =========================================================================
  const projectDatabase = {
    iot: {
      title: 'IoT Greenhouse Monitoring & Control System',
      category: 'IoT & Embedded Systems',
      year: '2025',
      image: 'project_thumb_iot.jpg',
      description: 'An autonomous environmental regulation setup powered by Arduino Uno. The system continually samples temperature and relative humidity using precision DHT11 digital sensors. When conditions cross calibrated safety thresholds, solid-state relays automatically activate cooling fans or mist irrigation solenoids.',
      features: [
        'Real-time temperature and relative humidity telemetry sampling',
        'Dual-relay automated control for thermal dissipation fans and moisture irrigation',
        'LCD status readout with direct Celsius, Fahrenheit, and humidity percentages',
        'Interrupt-driven microcontroller polling written in Embedded C',
        'Serial output diagnostic console for debugging threshold drift'
      ],
      technologies: ['Arduino Uno', 'Embedded C', 'DHT11 Sensor', 'Relay Modules', 'Serial Telemetry', 'Circuit Design'],
      github: 'https://github.com/samyukthaps86-afk'
    },
    ds: {
      title: 'Data Science Analytics Dashboard',
      category: 'Data Science & Machine Learning',
      year: '2026',
      image: 'project_thumb_datascience.jpg',
      description: 'An end-to-end Python exploratory data analysis and predictive pipeline. Features automated dataset cleaning and transformation with Pandas, feature scaling, classification model benchmarks via Scikit-learn, and rich visual telemetry rendered through Matplotlib and Seaborn.',
      features: [
        'Automated ETL data pipeline handling missing values and outlier detection',
        'Exploratory distribution analysis with correlation matrices and histogram charts',
        'Multiple classification model evaluations (Logistic Regression, Decision Trees)',
        'Cross-validation scoring with precision, recall, and ROC-AUC curve rendering',
        'Interactive CLI reporting interface for model selection and predictions'
      ],
      technologies: ['Python 3', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Jupyter'],
      github: 'https://github.com/samyukthaps86-afk'
    },
    portfolio: {
      title: 'Software Engineer Portfolio Web App',
      category: 'Web Engineering',
      year: '2026',
      image: 'project_thumb_portfolio.jpg',
      description: 'A bespoke, high-performance portfolio application built without bloated dependencies. Engineered with clean semantic HTML5, Vanilla CSS3 custom design tokens, and modular ES6 JavaScript. Includes dark/light mode toggle, dynamic scrollspy navigation, interactive chat assistant, and responsive layout.',
      features: [
        'Accessible, zero-dependency Vanilla JavaScript architecture',
        'Light & Dark mode themes with CSS custom properties and persistent state',
        'Interactive AI Portfolio Assistant with keyword understanding and quick prompts',
        'Smooth scroll navigation with active scrollspy observer and mobile drawer',
        'Client-side validated contact form and dynamic project modals'
      ],
      technologies: ['HTML5', 'Vanilla CSS3', 'JavaScript ES6', 'Google Fonts', 'Responsive Design', 'Git'],
      github: 'https://github.com/samyukthaps86-afk'
    }
  };

  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalImage = document.getElementById('modal-image');
  const modalCategory = document.getElementById('modal-category');
  const modalYear = document.getElementById('modal-year');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDescription = document.getElementById('modal-description');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalTechPills = document.getElementById('modal-tech-pills');
  const modalGithubLink = document.getElementById('modal-github-link');

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !projectModalBackdrop) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalYear.textContent = data.year;
    modalImage.src = data.image;
    modalImage.alt = `${data.title} preview screenshot`;
    modalDescription.textContent = data.description;

    // Populate features list
    modalFeaturesList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeaturesList.appendChild(li);
    });

    // Populate tech pills
    modalTechPills.innerHTML = '';
    data.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'pill-badge';
      span.textContent = tech;
      modalTechPills.appendChild(span);
    });

    modalGithubLink.href = data.github;

    // Display modal
    projectModalBackdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModalBackdrop) return;
    projectModalBackdrop.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  // Hook all "View Details" buttons
  document.querySelectorAll('.btn-view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  // Close on outside backdrop click
  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModalBackdrop && !projectModalBackdrop.hasAttribute('hidden')) {
      closeProjectModal();
    }
  });


  // =========================================================================
  // 8. INTERACTIVE PORTFOLIO ASSISTANT CHAT
  // =========================================================================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const clearChatBtn = document.getElementById('btn-clear-chat');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  const initialBotTime = document.getElementById('initial-bot-time');

  if (initialBotTime) {
    const now = new Date();
    initialBotTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Knowledge base responses for the Assistant
  const assistantKnowledge = [
    {
      keywords: ['skill', 'languages', 'tech stack', 'python', 'java', 'programming', 'c '],
      response: "Samyuktha's primary technical competencies include **Python** (data processing, scripting, algorithmic logic), **Java** (OOP, modular system architecture), **C** (memory structures, low-level DSA), **JavaScript & HTML5/CSS3** (modern web development), **Arduino / Embedded C** (IoT sensors & circuits), and **Unix Systems** (Infosys Springboard certified)."
    },
    {
      keywords: ['project', 'built', 'portfolio', 'iot', 'greenhouse', 'dashboard', 'work'],
      response: "Samyuktha has engineered several key projects:\n1. **IoT Greenhouse Monitoring & Control System** – An automated Arduino-based environment manager using DHT11 telemetry and relay actuation.\n2. **Data Science Analytics Dashboard** – Python/Pandas/Scikit-learn pipeline for statistical models and interactive visualization.\n3. **Modern Portfolio Website** – Accessible, responsive web app featuring custom chat, dark mode, and modular CSS/JS."
    },
    {
      keywords: ['education', 'college', 'degree', 'study', 'studying', 'university', 'ait', 'b.e'],
      response: "Samyuktha is pursuing her **Bachelor of Engineering in Data Science** at **Adichunchanagiri Institute of Technology**, Chikkamagaluru (2025–Present). She also completed intensive core software training at **TAP Academy** and holds a Unix Certification from **Infosys Springboard**."
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'call', 'touch', 'message', 'hire'],
      response: "You can reach Samyuktha directly via:\n• ✉️ **Email:** samyukthaps86@gmail.com\n• 📞 **Phone:** +91 9110852799\n• 🐙 **GitHub:** github.com/samyukthaps86-afk\n• 💼 **LinkedIn:** linkedin.com/in/samyuktha-ps-955a6b3b4\nOr feel free to send a message using the Contact Form below!"
    },
    {
      keywords: ['location', 'where', 'city', 'live', 'based'],
      response: "Samyuktha is based in **Chikkamagaluru, Karnataka, India**. She is open to both on-site and remote software engineering opportunities!"
    },
    {
      keywords: ['resume', 'cv', 'download'],
      response: "You can download Samyuktha's CV directly or contact her at **samyukthaps86@gmail.com** to receive the latest copy of her resume."
    },
    {
      keywords: ['testimonial', 'feedback', 'review', 'recommend', 'mentor', 'peer'],
      response: "Samyuktha has received strong endorsements from mentors and collaborators:\n• **Rajesh Kumar (TAP Academy Lead Trainer):** Highlights her exceptional algorithmic discipline and clean, structured OOP code.\n• **Ananya Rao (IoT Project Peer):** Commends her initiative, Embedded C sensor debugging, and dependable teamwork.\n• **Dr. H. M. Suresh (AIT Data Science Professor):** Praises her mathematical reasoning and dedicated pursuit of data science excellence."
    },
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you', 'what can you do'],
      response: "Hello there! 👋 I am Samyuktha's virtual assistant. I can tell you about her core programming skills, academic journey, IoT and data science projects, testimonials, or help you connect with her!"
    }
  ];

  function getAssistantResponse(userQuery) {
    const queryLower = userQuery.toLowerCase().trim();

    for (const item of assistantKnowledge) {
      if (item.keywords.some(keyword => queryLower.includes(keyword))) {
        return item.response;
      }
    }

    // Default response if no direct match
    return "Thank you for asking! Samyuktha specializes in **Software Engineering, Data Science, and IoT Automation**. For more specific questions, feel free to ask about her **skills**, **projects**, **education**, or use the Contact Form below to send her a personal note.";
  }

  function appendChatMessage(sender, text) {
    if (!chatMessages) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const row = document.createElement('div');
    row.className = `chat-message-row ${sender === 'user' ? 'user-row' : 'bot-row'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${sender === 'user' ? 'user-bubble' : 'bot-bubble'}`;

    // Format basic bold markdown **text** and newlines
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');

    bubble.innerHTML = `
      <p>${formattedText}</p>
      <span class="message-timestamp">${timeString}</span>
    `;

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatMessages.appendChild(row);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendTypingIndicator() {
    const indicatorId = 'typing-' + Date.now();
    const row = document.createElement('div');
    row.className = 'chat-message-row bot-row';
    row.id = indicatorId;

    row.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-bubble bot-bubble">
        <div class="typing-dots">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;

    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicatorId;
  }

  function handleUserMessage(query) {
    const trimmed = query.trim();
    if (!trimmed) return;

    // Append user message
    appendChatMessage('user', trimmed);

    // Show bot typing indicator
    const typingId = appendTypingIndicator();

    // Simulate smart thinking delay
    setTimeout(() => {
      const indicator = document.getElementById(typingId);
      if (indicator) indicator.remove();

      const botReply = getAssistantResponse(trimmed);
      appendChatMessage('bot', botReply);
    }, 600);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value;
      if (query.trim()) {
        handleUserMessage(query);
        chatInput.value = '';
      }
    });
  }

  // Handle quick suggestion chips
  if (suggestionChips.length) {
    suggestionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          handleUserMessage(query);
        }
      });
    });
  }

  // Clear chat handler
  if (clearChatBtn && chatMessages) {
    clearChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-message-row bot-row">
          <div class="message-avatar">🤖</div>
          <div class="message-bubble bot-bubble">
            <p>Conversation reset. How else can I assist you with Samyuktha's portfolio?</p>
            <span class="message-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      `;
    });
  }


  // =========================================================================
  // 9. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const btnSubmit = document.getElementById('btn-submit-contact');
  const copyEmailBtn = document.getElementById('btn-copy-email');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'samyukthaps86@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.textContent = '✅';
        copyEmailBtn.title = 'Copied to clipboard!';
        setTimeout(() => {
          copyEmailBtn.textContent = '📋';
          copyEmailBtn.title = 'Copy email address';
        }, 2000);
      }).catch(() => {
        alert('Email: ' + email);
      });
    });
  }

  if (contactForm) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous error messages
      nameError.textContent = '';
      emailError.textContent = '';
      subjectError.textContent = '';
      messageError.textContent = '';
      formFeedback.hidden = true;
      formFeedback.className = 'form-feedback';

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please provide your name.';
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email format (e.g. name@domain.com).';
        isValid = false;
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectError.textContent = 'Please provide a subject.';
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter your message.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Please provide a message with at least 10 characters.';
        isValid = false;
      }

      if (!isValid) return;

      // Simulate sending with loading state
      const originalBtnText = btnSubmit.querySelector('.btn-text-content').textContent;
      btnSubmit.disabled = true;
      btnSubmit.querySelector('.btn-text-content').textContent = 'Sending message...';

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.querySelector('.btn-text-content').textContent = originalBtnText;

        formFeedback.hidden = false;
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been sent successfully. Samyuktha will get back to you shortly.`;

        // Reset form inputs
        contactForm.reset();

        // Hide feedback after 6 seconds
        setTimeout(() => {
          formFeedback.hidden = true;
        }, 6000);
      }, 1000);
    });
  }

});
