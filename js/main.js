// ===== Mobile Toggle =====
document.addEventListener('click', function(e){
  if(e.target && e.target.matches('.mobile-toggle')){
    const nav = document.getElementById('mainNav');
    if(nav) nav.style.display = (nav.style.display === 'flex' || nav.style.display === '') ? 'none' : 'flex';
  }
});

// ===== Contact Form Handling =====
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const msg = document.getElementById('formMsg');

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    const data = {
      id: Date.now(),
      name: form.fullname.value.trim(),
      phone: form.phone.value.trim(),
      service: form.serviceSelect ? form.serviceSelect.value : (form.service ? form.service.value : 'Unknown'),
      details: form.details.value.trim(),
      time: new Date().toISOString()
    };
    saveSubmission(data);
    if(msg){ 
      msg.style.display='block'; 
      msg.textContent='Request saved. We will contact you on WhatsApp/Phone.' 
    }
    form.reset();
  });

  const clearBtn = document.getElementById('clearBtn');
  if(clearBtn){ 
    clearBtn.addEventListener('click', ()=>{
      form.reset(); 
      if(msg){ msg.style.display='none'; }
    }); 
  }
})();

function saveSubmission(obj){
  try{
    const key = 'alphaaryx_submissions_v2';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.unshift(obj);
    localStorage.setItem(key, JSON.stringify(arr));
  }catch(e){ console.error('Storage error',e); }
}

// ===== Download Submissions CSV =====
window.downloadSubmissionsCSV = function(){
  const key = 'alphaaryx_submissions_v2';
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  if(!arr.length){ alert('No submissions found'); return; }
  const headers = Object.keys(arr[0]);
  const csv = [headers.join(',')].concat(arr.map(r=>headers.map(h=>'\"'+String(r[h]||'').replace(/\"/g,'\"\"')+'\"').join(','))).join('\n');
  const blob = new Blob([csv],{type:'text/csv'}); 
  const url = URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='alphaaryx_submissions.csv'; a.click(); 
  URL.revokeObjectURL(url);
}

// ===== Scroll Animations =====
const animatedElements = document.querySelectorAll('.card, .features article, .grid .card, .hero-content, .hero-image');

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => {
  el.classList.add('pre-fade'); // initial hidden state
  observer.observe(el);
});

// ===== Hero Particles =====
const canvas = document.getElementById('heroCanvas');
if(canvas){
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  const particles = [];
  const particleCount = 50;

  // Particle class
  class Particle {
    constructor(){
      this.x = Math.random()*width;
      this.y = Math.random()*height;
      this.radius = Math.random()*3+1;
      this.speedX = (Math.random()-0.5)*0.5;
      this.speedY = (Math.random()-0.5)*0.5;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(0,123,255,0.3)';
      ctx.fill();
    }
    update(mouse){
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if(this.x < 0 || this.x > width) this.speedX *= -1;
      if(this.y < 0 || this.y > height) this.speedY *= -1;

      // Move slightly towards mouse
      if(mouse.x && mouse.y){
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 100){
          this.x -= dx*0.002;
          this.y -= dy*0.002;
        }
      }
      this.draw();
    }
  }

  for(let i=0;i<particleCount;i++){
    particles.push(new Particle());
  }

  const mouse = {x: null, y: null};
  canvas.addEventListener('mousemove', (e)=>{
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', ()=>{ mouse.x = null; mouse.y = null; });

  function animate(){
    ctx.clearRect(0,0,width,height);
    particles.forEach(p => p.update(mouse));
    requestAnimationFrame(animate);
  }
  animate();

  // Resize canvas on window resize
  window.addEventListener('resize', ()=>{
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });
}




form.addEventListener('submit', (e) => {
    e.preventDefault();

    const orderData = {
        name: form.name.value,
        email: form.email.value,
        service: form.service.value,
        message: form.message.value
    };

    // Send email
    emailjs.send('service_3eggz79', 'thank_you_template', orderData)
      .then(() => alert("Thank you email sent!"))
      .catch(err => alert("Email sending error: " + err));

    form.reset();
});


