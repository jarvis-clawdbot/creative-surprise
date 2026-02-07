// Digital Art Museum - Interactive Experience

document.addEventListener('DOMContentLoaded', () => {
  // Cursor glow effect
  const cursorGlow = document.querySelector('.cursor-glow');
  
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
  
  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Art card hover effects
  const artCards = document.querySelectorAll('.art-card');
  
  artCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
    
    // Interactive tilt effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
  
  // Parallax effect on scroll
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.5;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  
  // Reveal animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.feature, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
  
  // Add revealed class styles
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  // Random shimmer effect on art cards
  setInterval(() => {
    const randomCard = artCards[Math.floor(Math.random() * artCards.length)];
    randomCard.style.boxShadow = '0 0 40px rgba(102, 126, 234, 0.5)';
    
    setTimeout(() => {
      randomCard.style.boxShadow = '';
    }, 1000);
  }, 3000);
  
  // Console signature
  console.log('%c Digital Art Museum ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 10px; font-size: 16px; font-weight: bold;');
  console.log('%c Built with creativity and code ', 'color: #667eea; font-size: 12px;');
});

// Glitch effect enhancement
const glitchText = document.querySelector('.glitch');
if (glitchText) {
  setInterval(() => {
    glitchText.style.animation = 'glitch 0.3s';
    setTimeout(() => {
      glitchText.style.animation = 'glitch 2s infinite';
    }, 300);
  }, 5000);
}

// Performance monitor
if (window.performance && performance.mark) {
  performance.mark('app-ready');
  
  window.addEventListener('load', () => {
    performance.mark('page-loaded');
    performance.measure('page-load', 'app-ready', 'page-loaded');
    
    const measure = performance.getEntriesByName('page-load')[0];
    console.log(`Page loaded in ${measure.duration.toFixed(2)}ms`);
  });
}
