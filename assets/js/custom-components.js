// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTabsComponents();
    initProgressReveal();
    initScrollHighlightTOC();
  });
  
  // Also initialize when hy-push-state has loaded (for Hydejack's dynamic page loading)
  document.addEventListener('hy-push-state-load', function() {
    initTabsComponents();
    initProgressReveal();
    initScrollHighlightTOC();
  });
  
  // Tabs component functionality
  function initTabsComponents() {
    const tabContainers = document.querySelectorAll('.content-tabs');
    
    tabContainers.forEach(container => {
      const tabButtons = container.querySelectorAll('.tab-button');
      const tabPanes = container.querySelectorAll('.tab-pane');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Deactivate all tabs
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabPanes.forEach(pane => pane.classList.remove('active'));
          
          // Activate clicked tab
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          const activePane = container.querySelector(`#tab-${tabId}`);
          if (activePane) {
            activePane.classList.add('active');
          }
        });
      });
    });
  }
  
  // Reveal elements on scroll
  function initProgressReveal() {
    const timeline = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    timeline.forEach(item => {
      item.classList.add('timeline-item-hidden');
      observer.observe(item);
    });
  }
  
  // Highlight TOC items on scroll
  function initScrollHighlightTOC() {
    const headings = document.querySelectorAll('h2[id], h3[id]');
    const tocLinks = document.querySelectorAll('.toc-container a');
    
    if (headings.length === 0 || tocLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find the corresponding TOC link
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0% -80% 0%',
      threshold: 0
    });
    
    headings.forEach(heading => {
      observer.observe(heading);
    });
  }
  
  // Add CSS class for animation
  document.head.insertAdjacentHTML('beforeend', `
  <style>
    .timeline-item-hidden {
      opacity: 0;
      transform: translateX(-20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .timeline-item.animate {
      opacity: 1;
      transform: translateX(0);
    }
    
    .toc-container a.active {
      color: var(--accent-color);
      font-weight: bold;
    }
  </style>
  `);

  document.addEventListener('DOMContentLoaded', function() {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item, .timeline-marker');
    
    // Add click event listeners to each item
    timelineItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all items
        timelineItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // If this is a marker, also activate its parent timeline item
        if (this.classList.contains('timeline-marker')) {
          this.closest('.timeline-item').classList.add('active');
        }
        // If this is a timeline item, also activate its marker
        else if (this.classList.contains('timeline-item')) {
          this.querySelector('.timeline-marker').classList.add('active');
        }
      });
    });
  });