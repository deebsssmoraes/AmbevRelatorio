/* script.js - avançado: nav mobile, reveal animations, counters, table sort/filter,
   card filter, chart helpers. Depende de Chart.js carregado nas páginas que usam gráficos.
*/

document.addEventListener('DOMContentLoaded', () => {

  /* NAV MOBILE TOGGLE */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      if(getComputedStyle(mainNav).display === 'flex' || getComputedStyle(mainNav).display === 'block'){
        mainNav.style.display = 'none';
      } else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
      }
    });
    window.addEventListener('resize', () => {
      if(window.innerWidth > 820){
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'row';
      } else {
        mainNav.style.display = 'none';
      }
    });
    if(window.innerWidth <= 820) mainNav.style.display = 'none';
  }

  /* SMOOTH SCROLL for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  /* BACK TO TOP BUTTON */
  const backBtn = document.createElement('button');
  backBtn.id = 'back-to-top';
  backBtn.textContent = '↑';
  Object.assign(backBtn.style, {
    position:'fixed',right:'18px',bottom:'18px',padding:'10px 13px',borderRadius:'8px',border:'none',
    background:'#E15824',color:'#fff,cursor':'pointer',display:'none',zIndex:9999
  });
  document.body.appendChild(backBtn);
  backBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', () => backBtn.style.display = window.scrollY > 360 ? 'block' : 'none');

  /* REVEAL ON SCROLL */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('reveal-visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.card, .section, .hero, .image-placeholder').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  /* COUNTERS */
  const animateCounter = (el, to, duration=1400) => {
    const start = 0;
    const startTime = performance.now();
    const isFloat = String(to).includes('.');
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      let value = start + (to - start) * progress;
      if(!isFloat) value = Math.floor(value);
      else value = Math.round(value * 10) / 10;
      el.textContent = value;
      if(progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  document.querySelectorAll('.count').forEach(el => {
    const target = parseFloat(el.dataset.target || '0');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animateCounter(el, target);
          io.unobserve(el);
        }
      });
    }, {threshold:0.5});
    io.observe(el);
  });

  /* TABLE SORT (click headers) */
  document.querySelectorAll('.data-table').forEach(table => {
    table.querySelectorAll('th').forEach((th, idx) => {
      if(th.dataset.sort){
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
          const tbody = table.tBodies[0];
          const rows = Array.from(tbody.rows);
          const type = th.dataset.sort;
          const asc = th.dataset.asc !== 'true';
          rows.sort((a,b) => {
            let A = a.cells[idx].innerText.trim();
            let B = b.cells[idx].innerText.trim();
            if(type === 'number'){ A = parseFloat(A.replace(',', '.')) || 0; B = parseFloat(B.replace(',', '.')) || 0; return asc ? A - B : B - A; }
            return asc ? A.localeCompare(B) : B.localeCompare(A);
          });
          rows.forEach(r => tbody.appendChild(r));
          th.dataset.asc = asc;
        });
      }
    });
  });

  /* TABLE SEARCH */
  const tableSearch = document.getElementById('tableSearch');
  if(tableSearch){
    tableSearch.addEventListener('input', () => {
      const q = tableSearch.value.toLowerCase();
      document.querySelectorAll('#econTable tbody tr').forEach(tr => {
        tr.style.display = tr.innerText.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* CARD FILTER (by data-category) */
  document.querySelectorAll('button[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      const container = document.getElementById(btn.dataset.target || 'elasticity-cards');
      if(!container) return;
      container.querySelectorAll('.card').forEach(card => {
        const cat = card.dataset.category || '';
        card.style.display = (f === 'all' || cat === f) ? '' : 'none';
      });
    });
  });

  /* Expose chart helpers */
  window.site = window.site || {};
  window.site.updateChart = (chart, data, labels) => {
    if(!chart) return;
    if(labels) chart.data.labels = labels;
    chart.data.datasets.forEach((ds,i) => { if(data[i]) ds.data = data[i]; });
    chart.update();
  };

});
});
