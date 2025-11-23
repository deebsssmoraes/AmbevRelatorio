// script.js - navegação e interatividade simples

document.addEventListener('DOMContentLoaded', function(){

  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if(navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.style.display === 'flex';
      mainNav.style.display = isOpen ? 'none' : 'flex';
      mainNav.style.flexDirection = isOpen ? '' : 'column';
      mainNav.style.gap = '8px';
    });

    // hide nav on resize > mobile
    window.addEventListener('resize', () => {
      if(window.innerWidth > 820){
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'row';
      } else {
        mainNav.style.display = 'none';
      }
    });

    // init state
    if(window.innerWidth <= 820) mainNav.style.display = 'none';
  }

  // mark active link based on current path
  const links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    if(a.href === location.href || a.getAttribute('href') === location.pathname.split('/').pop()) {
      a.classList.add('active');
    }
  });

  // back to top button
  const back = document.createElement('button');
  back.id = 'back-to-top';
  back.textContent = '↑';
  back.style.position = 'fixed';
  back.style.right = '18px';
  back.style.bottom = '18px';
  back.style.padding = '10px 12px';
  back.style.borderRadius = '8px';
  back.style.border = 'none';
  back.style.background = '#E15824';
  back.style.color = '#fff';
  back.style.cursor = 'pointer';
  back.style.display = 'none';
  back.style.boxShadow = '0 6px 18px rgba(14,59,191,0.15)';
  document.body.appendChild(back);

  back.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', () => {
    back.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

});
