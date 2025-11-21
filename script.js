// Rolagem suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
});

// Tooltip hover dinâmico
const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(el=>{
    el.addEventListener('mouseenter',()=>{el.style.fontWeight='600';});
    el.addEventListener('mouseleave',()=>{el.style.fontWeight='400';});
});

// Botão voltar ao topo
const backToTop=document.createElement('button');
backToTop.textContent='↑'; backToTop.id='back-to-top';
backToTop.style.position='fixed'; backToTop.style.bottom='30px'; backToTop.style.right='30px';
backToTop.style.padding='10px 15px'; backToTop.style.border='none'; backToTop.style.borderRadius='50%';
backToTop.style.background='#2563eb'; backToTop.style.color='#fff'; backToTop.style.cursor='pointer';
backToTop.style.display='none'; backToTop.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)';
document.body.appendChild(backToTop);

backToTop.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});
window.addEventListener('scroll',()=>{backToTop.style.display=(window.scrollY>300)?'block':'none';});
