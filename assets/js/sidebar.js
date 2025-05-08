// File: assets/js/my-sidebar.js

document.addEventListener('DOMContentLoaded', function() {
    // Get references to key elements
    const drawer = document.getElementById('_drawer');
    const sidebar = document.getElementById('_sidebar');
    const menu = document.getElementById('_menu');
    
    // Track current state
    let state = sidebar.classList.contains('sidebar-thin') ? 'thin' :
                drawer.classList.contains('opened') ? 'full' : 'closed';
    
    // Function to set sidebar state
    function setSidebarState(newState) {
      // Remove existing state classes
      sidebar.classList.remove('sidebar-thin');
      drawer.classList.remove('opened');
      
      // Apply new state
      state = newState;
      
      switch(state) {
        case 'thin':
          sidebar.classList.add('sidebar-thin');
          break;
        case 'full':
          drawer.classList.add('opened');
          break;
        case 'closed':
          // Default state, no classes needed
          break;
      }
    }
    
    // Add click handler for thin state
    sidebar.addEventListener('click', function(e) {
      // Only handle clicks directly on the sidebar element,
      // not on its children
      if (e.target === sidebar || e.target.classList.contains('sidebar-bg')) {
        if (state === 'thin') {
          setSidebarState('full');
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });
    
    // Intercept the existing menu click handler
    const originalMenuClick = menu.onclick;
    menu.onclick = function(e) {
      // If in thin state, go to full
      if (state === 'thin') {
        setSidebarState('full');
        e.preventDefault();
        return false;
      }
      // Otherwise use original handler
      else if (originalMenuClick) {
        return originalMenuClick.call(this, e);
      }
    };
    
    // Add handler for when user is reading a post
    function setInitialState() {
      // Check if we're on a post page
      const isPostPage = document.body.classList.contains('layout-post');
      
      // Initial state for post pages
      if (isPostPage && state !== 'full') {
        setSidebarState('thin');
      }
    }
    
    // Apply initial state
    setInitialState();
    
    // Listen for hy-push-state events to handle page transitions
    const pushState = document.getElementById('_pushState');
    if (pushState) {
      pushState.addEventListener('hy-push-state-load', function() {
        // Re-apply initial state on page change
        window.setTimeout(setInitialState, 500);
      });
    }
  });