// Script para navegação suave e interações básicas

document.addEventListener('DOMContentLoaded', function() {

  // Suave scroll ao clicar nos links do nav
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if(this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Função modal para referências e sobre
  const buttons = document.querySelectorAll('button[data-target]');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const modal = document.getElementById(targetId);
      if(modal) {
        modal.style.display = 'block';
      }
    });
  });

  // Fechar modais
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if(e.target.classList.contains('modal')) {
        modal.style.display = 'none';
      }
    });
  });

});
