// Modern clock JS: updates analog and digital time, and handles theme toggle
(function(){
  const hour = document.getElementById('hour');
  const minute = document.getElementById('minute');
  const second = document.getElementById('second');
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  const themeToggle = document.getElementById('themeToggle');

  function pad(n){return n.toString().padStart(2,'0')}

  function update(){
    const now = new Date();
    const hh = now.getHours();
    const mm = now.getMinutes();
    const ss = now.getSeconds();
    const ms = now.getMilliseconds();

    const hDeg = (hh % 12) * 30 + mm * 0.5;
    const mDeg = mm * 6 + ss * 0.1;
    const sDeg = ss * 6 + ms * 0.006;

    hour.style.transform = `translate(-50%,-100%) rotate(${hDeg}deg)`;
    minute.style.transform = `translate(-50%,-100%) rotate(${mDeg}deg)`;
    second.style.transform = `translate(-50%,-100%) rotate(${sDeg}deg)`;

    timeEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
    dateEl.textContent = now.toLocaleDateString(undefined, { weekday:'long', month:'short', day:'numeric', year:'numeric' });

    requestAnimationFrame(update);
  }

  // theme
  function setTheme(dark){
    if(!dark) document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
    try{ localStorage.setItem('mf_theme', dark ? 'dark' : 'light') }catch(e){}
    themeToggle.checked = !dark ? true : false;
  }

  themeToggle.addEventListener('change', ()=> {
    setTheme(themeToggle.checked ? 'light' : 'dark');
  });

  // init
  const saved = (function(){try{return localStorage.getItem('mf_theme')}catch(e){return null}})();
  setTheme(saved==='light');

  // start
  requestAnimationFrame(update);
})();
