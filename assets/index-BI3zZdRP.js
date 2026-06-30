var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`modulepreload`,r=function(e){return`/keyboard-learn/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function u(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}o=l(t.map(t=>{if(t=r(t,a),t=u(t),t in i)return;i[t]=!0;let o=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.href===t&&(!o||r.rel===`stylesheet`))return}let s=document.createElement(`link`);if(s.rel=o?`stylesheet`:n,o||(s.as=`script`),s.crossOrigin=``,s.href=t,c&&s.setAttribute(`nonce`,c),document.head.appendChild(s),o)return new Promise((e,n)=>{s.addEventListener(`load`,e),s.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})};function o(e){let t=document.getElementById(`app`);t&&(t.innerHTML=`
    <div class="menu-container">
      <div class="menu-header">
        <h1 class="menu-title">
          <span class="title-icon">⌨️</span>
          键盘小达人
          <span class="title-icon">🎯</span>
        </h1>
        <p class="menu-subtitle">一起来学习键盘打字吧！</p>
      </div>

      <div class="menu-cards">
        <div class="menu-card" data-mode="familiar">
          <div class="card-icon">🎮</div>
          <h2 class="card-title">键盘熟习练习</h2>
          <p class="card-desc">认识键盘布局，学习手指指法</p>
          <div class="card-badge">推荐使用</div>
        </div>

        <div class="menu-card" data-mode="alphabet">
          <div class="card-icon">🔤</div>
          <h2 class="card-title">按字母顺序练习</h2>
          <p class="card-desc">从 A 到 Z，按顺序认识每个字母键</p>
        </div>

        <div class="menu-card" data-mode="number">
          <div class="card-icon">🔢</div>
          <h2 class="card-title">数字键练习</h2>
          <p class="card-desc">练习输入 0~9 数字键，掌握数字行</p>
        </div>

        <div class="menu-card" data-mode="word">
          <div class="card-icon">📝</div>
          <h2 class="card-title">英文单词打字</h2>
          <p class="card-desc">练习输入英文单词，提升打字速度</p>
        </div>

        <div class="menu-card" data-mode="full">
          <div class="card-icon">🖥️</div>
          <h2 class="card-title">全键盘练习</h2>
          <p class="card-desc">包含 Ctrl/Shift/Alt/空格 等所有键</p>
          <div class="card-badge">进阶挑战</div>
        </div>
      </div>

      <div class="menu-footer">
        <div class="stars-display">
          <span class="stars-label">我的星星：</span>
          <span class="stars-value" id="menu-stars">⭐ 0</span>
        </div>
        <div class="practice-count">
          已练习 <span id="menu-practice-count">0</span> 次
        </div>
        <a class="github-link" href="https://github.com/dodio/keyboard-learn" target="_blank" rel="noopener" title="在 GitHub 上查看源码">
          <svg class="github-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  `,s(),t.querySelectorAll(`.menu-card`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.mode;n&&e(n)})}))}function s(){a(async()=>{let{loadProgress:e}=await Promise.resolve().then(()=>S);return{loadProgress:e}},void 0).then(({loadProgress:e})=>{let t=e(),n=document.getElementById(`menu-stars`),r=document.getElementById(`menu-practice-count`);n&&(n.textContent=`⭐ ${t.stars}`),r&&(r.textContent=String(t.practiceCount))})}var c={L5:{id:`L5`,name:`左手小指`,nameEn:`Left Pinky`,color:`#FF6B6B`,side:`left`,index:0},L4:{id:`L4`,name:`左手无名指`,nameEn:`Left Ring`,color:`#FFA07A`,side:`left`,index:1},L3:{id:`L3`,name:`左手中指`,nameEn:`Left Middle`,color:`#FFD93D`,side:`left`,index:2},L2:{id:`L2`,name:`左手食指`,nameEn:`Left Index`,color:`#6BCB77`,side:`left`,index:3},L1:{id:`L1`,name:`左手拇指`,nameEn:`Left Thumb`,color:`#4ECDC4`,side:`left`,index:4},R1:{id:`R1`,name:`右手拇指`,nameEn:`Right Thumb`,color:`#4ECDC4`,side:`right`,index:5},R2:{id:`R2`,name:`右手食指`,nameEn:`Right Index`,color:`#6BCB77`,side:`right`,index:6},R3:{id:`R3`,name:`右手中指`,nameEn:`Right Middle`,color:`#FFD93D`,side:`right`,index:7},R4:{id:`R4`,name:`右手无名指`,nameEn:`Right Ring`,color:`#FFA07A`,side:`right`,index:8},R5:{id:`R5`,name:`右手小指`,nameEn:`Right Pinky`,color:`#FF6B6B`,side:`right`,index:9}},l=[[{key:"`",code:`Backquote`,label:"`~",row:0,col:0,finger:`L5`},{key:`1`,code:`Digit1`,label:`1!`,row:0,col:1,finger:`L5`},{key:`2`,code:`Digit2`,label:`2@`,row:0,col:2,finger:`L4`},{key:`3`,code:`Digit3`,label:`3#`,row:0,col:3,finger:`L3`},{key:`4`,code:`Digit4`,label:`4$`,row:0,col:4,finger:`L2`},{key:`5`,code:`Digit5`,label:`5%`,row:0,col:5,finger:`L2`},{key:`6`,code:`Digit6`,label:`6^`,row:0,col:6,finger:`R2`},{key:`7`,code:`Digit7`,label:`7&`,row:0,col:7,finger:`R2`},{key:`8`,code:`Digit8`,label:`8*`,row:0,col:8,finger:`R3`},{key:`9`,code:`Digit9`,label:`9(`,row:0,col:9,finger:`R4`},{key:`0`,code:`Digit0`,label:`0)`,row:0,col:10,finger:`R5`},{key:`-`,code:`Minus`,label:`-_`,row:0,col:11,finger:`R5`},{key:`=`,code:`Equal`,label:`=+`,row:0,col:12,finger:`R5`},{key:`Backspace`,code:`Backspace`,label:`←`,row:0,col:13,finger:`R5`}],[{key:`Tab`,code:`Tab`,label:`Tab`,row:1,col:0,finger:`L5`},{key:`q`,code:`KeyQ`,label:`Q`,row:1,col:1,finger:`L5`},{key:`w`,code:`KeyW`,label:`W`,row:1,col:2,finger:`L4`},{key:`e`,code:`KeyE`,label:`E`,row:1,col:3,finger:`L3`},{key:`r`,code:`KeyR`,label:`R`,row:1,col:4,finger:`L2`},{key:`t`,code:`KeyT`,label:`T`,row:1,col:5,finger:`L2`},{key:`y`,code:`KeyY`,label:`Y`,row:1,col:6,finger:`R2`},{key:`u`,code:`KeyU`,label:`U`,row:1,col:7,finger:`R2`},{key:`i`,code:`KeyI`,label:`I`,row:1,col:8,finger:`R3`},{key:`o`,code:`KeyO`,label:`O`,row:1,col:9,finger:`R4`},{key:`p`,code:`KeyP`,label:`P`,row:1,col:10,finger:`R5`},{key:`[`,code:`BracketLeft`,label:`[{`,row:1,col:11,finger:`R5`},{key:`]`,code:`BracketRight`,label:`]}`,row:1,col:12,finger:`R5`},{key:`\\`,code:`Backslash`,label:`\\|`,row:1,col:13,finger:`R5`}],[{key:`CapsLock`,code:`CapsLock`,label:`Caps`,row:2,col:0,finger:`L5`},{key:`a`,code:`KeyA`,label:`A`,row:2,col:1,finger:`L5`},{key:`s`,code:`KeyS`,label:`S`,row:2,col:2,finger:`L4`},{key:`d`,code:`KeyD`,label:`D`,row:2,col:3,finger:`L3`},{key:`f`,code:`KeyF`,label:`F`,row:2,col:4,finger:`L2`},{key:`g`,code:`KeyG`,label:`G`,row:2,col:5,finger:`L2`},{key:`h`,code:`KeyH`,label:`H`,row:2,col:6,finger:`R2`},{key:`j`,code:`KeyJ`,label:`J`,row:2,col:7,finger:`R2`},{key:`k`,code:`KeyK`,label:`K`,row:2,col:8,finger:`R3`},{key:`l`,code:`KeyL`,label:`L`,row:2,col:9,finger:`R4`},{key:`;`,code:`Semicolon`,label:`;:`,row:2,col:10,finger:`R5`},{key:`'`,code:`Quote`,label:`'"`,row:2,col:11,finger:`R5`},{key:`Enter`,code:`Enter`,label:`Enter`,row:2,col:12,finger:`R5`}],[{key:`Shift`,code:`ShiftLeft`,label:`Shift`,row:3,col:0,finger:`L5`},{key:`z`,code:`KeyZ`,label:`Z`,row:3,col:1,finger:`L5`},{key:`x`,code:`KeyX`,label:`X`,row:3,col:2,finger:`L4`},{key:`c`,code:`KeyC`,label:`C`,row:3,col:3,finger:`L3`},{key:`v`,code:`KeyV`,label:`V`,row:3,col:4,finger:`L2`},{key:`b`,code:`KeyB`,label:`B`,row:3,col:5,finger:`L2`},{key:`n`,code:`KeyN`,label:`N`,row:3,col:6,finger:`R2`},{key:`m`,code:`KeyM`,label:`M`,row:3,col:7,finger:`R2`},{key:`,`,code:`Comma`,label:`,<`,row:3,col:8,finger:`R3`},{key:`.`,code:`Period`,label:`.>`,row:3,col:9,finger:`R4`},{key:`/`,code:`Slash`,label:`/?`,row:3,col:10,finger:`R5`},{key:`ShiftR`,code:`ShiftRight`,label:`Shift`,row:3,col:11,finger:`R5`}],[{key:`Ctrl`,code:`ControlLeft`,label:`Ctrl`,row:4,col:0,finger:`L1`},{key:`Win`,code:`MetaLeft`,label:`Win`,row:4,col:1,finger:`L1`},{key:`Alt`,code:`AltLeft`,label:`Alt`,row:4,col:2,finger:`L1`},{key:`Space`,code:`Space`,label:``,row:4,col:3,finger:`L1`},{key:`AltR`,code:`AltRight`,label:`Alt`,row:4,col:4,finger:`R1`},{key:`WinR`,code:`MetaRight`,label:`Win`,row:4,col:5,finger:`R1`},{key:`Menu`,code:`ContextMenu`,label:`Menu`,row:4,col:6,finger:`R1`},{key:`CtrlR`,code:`ControlRight`,label:`Ctrl`,row:4,col:7,finger:`R1`}]];function u(){let e=[];for(let t of l)for(let n of t)n.key.length===1&&/[a-z]/.test(n.key)&&e.push(n);return e}function d(){let e=[];for(let t of l[0])t.key.length===1&&/[0-9]/.test(t.key)&&e.push(t);return e}function f(){return u().sort((e,t)=>e.key.localeCompare(t.key))}function p(e){for(let t of l)for(let n of t)if(n.key.toLowerCase()===e.toLowerCase())return n}function ee(e){for(let t of l)for(let n of t)if(n.code===e)return n}var m=class{ctx;canvas;highlightedKey=null;highlightedFinger=null;pressedKey=null;dpr=1;keyW=48;keyH=48;gap=4;padX=16;padY=12;radius=6;scale=1;rowStartOffsets=[];constructor(e){this.canvas=e.canvas;let t=this.canvas.getContext(`2d`);if(!t)throw Error(`Cannot get canvas context`);this.ctx=t,this.dpr=window.devicePixelRatio||1,this.setupSize(),this.render()}setupSize(){let e=this.canvas.getBoundingClientRect();this.canvas.width=e.width*this.dpr,this.canvas.height=e.height*this.dpr,this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0)}highlight(e,t=null){this.highlightedKey=e,this.highlightedFinger=t,this.render()}showPress(e){this.pressedKey=e,this.render(),setTimeout(()=>{this.pressedKey=null,this.render()},150)}render(){let e=this.ctx,t=this.canvas.width/this.dpr,n=this.canvas.height/this.dpr;e.clearRect(0,0,t,n),e.fillStyle=`#F5F0E8`,e.beginPath(),e.roundRect(4,4,t-8,n-8,12),e.fill(),this.calculateSize(t,n);for(let t=0;t<l.length;t++){let n=l[t],r=this.rowStartOffsets[t]||0;for(let i=0;i<n.length;i++){let a=n[i],o=this.padX+r;for(let e=0;e<i;e++)o+=this.getKeyDisplayWidth(n[e])+this.gap;let s=this.padY+t*(this.keyH+this.gap),l=this.highlightedKey?.toLowerCase()===a.key.toLowerCase(),u=this.highlightedFinger!==null&&a.finger===this.highlightedFinger,d=this.pressedKey?.toLowerCase()===a.key.toLowerCase(),f=c[a.finger]?.color||`#999`;this.drawKey(e,o,s,a,f,l,u,d)}}}getKeyDisplayWidth(e){switch(e.code){case`Backspace`:return this.keyW*1.6;case`Tab`:return this.keyW*1.4;case`CapsLock`:return this.keyW*1.5;case`Enter`:return this.keyW*1.7;case`ShiftLeft`:case`ShiftRight`:return this.keyW*1.8;case`Space`:return this.keyW*4.5;default:return this.keyW}}getRowWidth(e){let t=0;for(let n of e)t+=this.getKeyDisplayWidth(n);return t+=(e.length-1)*this.gap,t}calculateSize(e,t){let n=0;for(let e of l){let t=this.estimateRowWidth(e);n=Math.max(n,t)}let r=e-this.padX*2,i=t-this.padY*2,a=240+this.gap*4,o=r/n,s=i/a,c=Math.min(o,s,1.5);this.scale=Math.max(.6,c),this.keyW=Math.floor(48*this.scale),this.keyH=Math.floor(48*this.scale),this.gap=Math.max(1,Math.floor(4*this.scale)),this.radius=Math.max(3,Math.floor(8*this.scale)),this.padX=Math.max(6,Math.floor(16*this.scale)),this.padY=Math.max(6,Math.floor(12*this.scale));let u=l;this.rowStartOffsets=[];let d=0,f=[];for(let e=0;e<u.length;e++){let t=this.getRowWidth(u[e]);f.push(t),d=Math.max(d,t)}for(let e=0;e<u.length;e++)this.rowStartOffsets.push((d-f[e])/2)}estimateRowWidth(e){let t=0;for(let n of e)switch(n.code){case`Backspace`:t+=48*1.6;break;case`Tab`:t+=48*1.4;break;case`CapsLock`:t+=48*1.5;break;case`Enter`:t+=48*1.7;break;case`ShiftLeft`:case`ShiftRight`:t+=48*1.8;break;case`Space`:t+=48*4.5;break;default:t+=48}return t+=(e.length-1)*4,t}drawKey(e,t,n,r,i,a,o,s){let c=this.getKeyDisplayWidth(r),l=this.keyH;s||(e.fillStyle=`rgba(0,0,0,0.12)`,e.beginPath(),e.roundRect(t+2,n+2,c,l,this.radius),e.fill()),s?e.fillStyle=`#4ECDC4`:a?e.fillStyle=`#FFE66D`:o?e.fillStyle=i+`33`:e.fillStyle=`#FFFFFF`,e.beginPath(),e.roundRect(t,n,c,l,this.radius),e.fill(),e.strokeStyle=a?`#FF6B6B`:i+`88`,e.lineWidth=a?3:1.5,e.beginPath(),e.roundRect(t,n,c,l,this.radius),e.stroke();let u=this.getKeyLabel(r);e.fillStyle=s?`#FFFFFF`:`#2D3436`,e.font=`bold ${Math.max(10,Math.min(16,this.keyW*.33))}px "PingFang SC", "Comic Sans MS", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(u,t+c/2,n+l/2),(r.key===`f`||r.key===`j`)&&(e.fillStyle=`#FF6B6B`,e.beginPath(),e.arc(t+c/2,n+l*.72,3,0,Math.PI*2),e.fill())}getKeyLabel(e){if(e.label)return e.label.length<=2?e.label:e.key;switch(e.key){case`Space`:return`空格`;case`Backspace`:return`←`;case`Enter`:return`Enter`;case`Shift`:return`⇧`;case`ShiftR`:return`⇧`;case`Ctrl`:return`Ctrl`;case`CtrlR`:return`Ctrl`;case`Alt`:return`Alt`;case`AltR`:return`Alt`;case`CapsLock`:return`Caps`;case`Tab`:return`Tab`;case`Win`:return`Win`;case`WinR`:return`Win`;case`Menu`:return`☰`;default:return e.key.toUpperCase()}}resize(){this.setupSize(),this.render()}},h=class{ctx;canvas;dpr=1;activeFinger=null;animationFrame=0;pulsePhase=0;constructor(e){this.canvas=e.canvas;let t=this.canvas.getContext(`2d`);if(!t)throw Error(`Cannot get canvas context`);this.ctx=t,this.dpr=window.devicePixelRatio||1,this.setupSize(),this.startAnimation()}setupSize(){let e=this.canvas.getBoundingClientRect();this.canvas.width=e.width*this.dpr,this.canvas.height=e.height*this.dpr,this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0)}activateFinger(e){this.activeFinger=e,this.render()}startAnimation(){let e=()=>{this.pulsePhase+=.05,this.render(),this.animationFrame=requestAnimationFrame(e)};e()}stopAnimation(){cancelAnimationFrame(this.animationFrame)}render(){let e=this.ctx,t=this.canvas.width/this.dpr,n=this.canvas.height/this.dpr;e.clearRect(0,0,t,n),e.fillStyle=`#FFF8F0`,e.beginPath(),e.roundRect(16,16,t-32,n-32,16),e.fill();let r=n*.68;this.drawHand(e,t*.27,r,`left`),this.drawHand(e,t*.73,r,`right`),e.strokeStyle=`#E0D5C8`,e.lineWidth=1,e.setLineDash([6,6]),e.beginPath(),e.moveTo(t/2,16),e.lineTo(t/2,n-16),e.stroke(),e.setLineDash([])}drawHand(e,t,n,r){let i=r===`left`?[`L5`,`L4`,`L3`,`L2`,`L1`]:[`R1`,`R2`,`R3`,`R4`,`R5`],a=this.canvas.width/this.dpr,o=a*.1,s=a*.06,l=a*.14;e.fillStyle=`#FFDDB5`,e.strokeStyle=`#D4A576`,e.lineWidth=2.5,e.beginPath(),e.roundRect(t-o,n-s*.5,o*2,s,12),e.fill(),e.stroke(),e.strokeStyle=`#D4A576`,e.lineWidth=3,e.beginPath(),e.moveTo(t-o*.6,n+s*.5),e.lineTo(t-o*.5,n+s*1.3),e.moveTo(t+o*.6,n+s*.5),e.lineTo(t+o*.5,n+s*1.3),e.stroke();let u=this.calcFingerPositions(t,n,o,l,r);i.forEach((t,n)=>{let r=c[t],i=u[n],a=this.activeFinger===t;this.drawFinger(e,i,r,a)}),e.fillStyle=`#B0A090`,e.font=`${Math.max(12,a*.018)}px "PingFang SC", "Microsoft YaHei", sans-serif`,e.textAlign=`center`,e.textBaseline=`top`,e.fillText(r===`left`?`👈 左手`:`右手 👉`,t,n+s*1.5)}calcFingerPositions(e,t,n,r,i){let a=[],o=n*2*1.05;for(let s=0;s<5;s++){let c=i===`left`?s===4:s===0,l=(i===`left`?[-.85,-.35,.1,.55,.95]:[-.95,-.55,-.1,.35,.85])[s],u=e+l*o*.5,d=t,f,p;c?(f=u+(i===`left`?n*.5:-n*.5),p=d+r*.65):(f=u,p=d-r*(1-Math.abs(l)*.15)),a.push({baseX:u,baseY:d,tipX:f,tipY:p})}return a}drawFinger(e,t,n,r){let{baseX:i,baseY:a,tipX:o,tipY:s}=t,c=n.color,l=1;r&&(l=Math.sin(this.pulsePhase*2.5)*.25+1),r&&(e.save(),e.shadowColor=c,e.shadowBlur=16*l),e.strokeStyle=r?c:`#E8C9A0`,e.lineWidth=r?13*l:10,e.lineCap=`round`,e.beginPath(),e.moveTo(i,a),e.lineTo(o,s),e.stroke(),e.strokeStyle=`rgba(0,0,0,0.08)`,e.lineWidth=1.5;for(let t=1;t<=2;t++){let n=i+(o-i)*(t*.33),r=a+(s-a)*(t*.33);e.beginPath(),e.moveTo(n-4,r),e.lineTo(n+4,r),e.stroke()}e.fillStyle=r?c:`#F5D5B0`;let u=r?15*l:11;if(e.beginPath(),e.arc(o,s,u,0,Math.PI*2),e.fill(),r&&(e.fillStyle=`#FFFFFF`,e.beginPath(),e.arc(o-3,s-3,u*.35,0,Math.PI*2),e.fill()),r&&e.restore(),r&&(e.strokeStyle=c+`66`,e.lineWidth=3,e.beginPath(),e.arc(o,s,22+8*l,0,Math.PI*2),e.stroke(),e.strokeStyle=c+`33`,e.lineWidth=2,e.beginPath(),e.arc(o,s,32+12*l,0,Math.PI*2),e.stroke()),r){let t=this.canvas.width/this.dpr,r=Math.max(11,t*.016),i=s-20-8*l,a=n.name.replace(`左手`,``).replace(`右手`,``),u=e.measureText(a).width;e.fillStyle=c+`CC`,e.beginPath(),e.roundRect(o-u/2-8,i-r/2-4,u+16,r+8,10),e.fill(),e.fillStyle=`#FFFFFF`,e.font=`bold ${r}px "PingFang SC", "Microsoft YaHei", sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(a,o,i)}}resize(){this.setupSize(),this.render()}};function g(e){let t;switch(e){case`alphabet`:t=26;break;case`number`:t=20;break;case`familiar`:t=20;break;case`full`:t=30;break;case`word`:t=10;break}return{mode:e,currentIndex:0,totalQuestions:t,correctCount:0,wrongCount:0,streak:0,maxStreak:0,score:0,isFinished:!1,elapsedMs:0,isPaused:!1}}function _(e){let t=e/1e3,n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,`0`)}:${r.toFixed(2).padStart(5,`0`)}`}function v(e){let t=e/1e3,n=Math.floor(t/60),r=(t%60).toFixed(2);return n>0?`${n} 分 ${r} 秒`:`${r} 秒`}function te(e){let t=se(),n=p(` `),r=n?[...t,n]:t,i=e?r.filter(t=>!e.includes(t.key)):r,a=i.length>0?i:r,o=a[Math.floor(Math.random()*a.length)];return b(o)}function ne(e){let t=f(),n=t[e%t.length];return b(n)}function re(e){let t=d(),n=t;e&&e.length<t.length&&(n=t.filter(t=>!e.includes(t.key)));let r=n[Math.floor(Math.random()*n.length)];return b(r)}function ie(e){let t=ae(),n=e?t.filter(t=>!e.includes(t.key)):t,r=n.length>0?n:t,i=r[Math.floor(Math.random()*r.length)];return b(i)}function ae(){let e=[];for(let t of l)for(let n of t)e.push(n);return e}var y=`cat.dog.sun.run.fun.big.red.box.top.hot.cup.bus.map.hat.pen.leg.arm.eye.ear.ice.key.job.fly.sky.sea.dry.cry.try.why.how.bird.fish.tree.book.ball.game.play.jump.star.moon.hand.foot.head.face.nose.kite.door.wall.desk.lamp.cake.rice.milk.water.apple.grape.pear.plum.peach.lemon.heart.smile.dream.cloud.flower.grass.green.white.black.brown.house.chair.table.window.garden.school.teacher.student.paper.pencil.banana.orange.monkey.rabbit.turtle.dragon.castle.rocket.planet.summer`.split(`.`);function oe(){let e=y[Math.floor(Math.random()*y.length)],t=[];for(let n of e){let e=p(n);e&&t.push(b(e))}return{word:e,questions:t}}function b(e){let t=c[e.finger],n=e.finger.startsWith(`L`)?`左`:`右`,r=e.key===` `?`Space`:e.label||e.key.toUpperCase(),i=e.key===` `?`空格键`:`"${e.key.toUpperCase()}" 键`;return{key:e.key,label:r,finger:e.finger,fingerName:t.name,fingerColor:t.color,hint:`请用${n}手${t.name.replace(/^左|右/,``)}按下 ${i}`}}function se(){let e=[];for(let t of l)for(let n of t)n.key.length===1&&/[a-z]/.test(n.key)&&e.push(n);return e}function x(e,t){return e.key.toLowerCase()===t.toLowerCase()}function ce(e,t){let n=ee(t);return n?n.key===e.key:!1}var le=class{state;currentQuestion=null;usedKeys=[];callbacks;mode;alphabetIndex=0;startTime=0;accumulatedMs=0;timerInterval=null;constructor(e,t=`familiar`){this.callbacks=e,this.mode=t,this.state=g(t)}start(){this.state=g(this.mode),this.usedKeys=[],this.alphabetIndex=0,this.accumulatedMs=0,this.startTime=performance.now(),this.state.isPaused=!1,this.startTimer(),this.nextQuestion(),this.callbacks.onTimerUpdate(`00:00.00`)}pause(){this.state.isPaused||this.state.isFinished||(this.state.isPaused=!0,this.stopTimer(),this.callbacks.onPauseChange(!0))}resume(){!this.state.isPaused||this.state.isFinished||(this.state.isPaused=!1,this.startTime=performance.now(),this.startTimer(),this.callbacks.onPauseChange(!1))}togglePause(){this.state.isPaused?this.resume():this.pause()}getElapsedMs(){return this.state.isPaused?this.accumulatedMs:this.accumulatedMs+(performance.now()-this.startTime)}getFormattedTime(){return _(this.getElapsedMs())}startTimer(){this.timerInterval!==null&&(clearInterval(this.timerInterval),this.timerInterval=null),this.timerInterval=setInterval(()=>{let e=this.getElapsedMs();this.accumulatedMs=e,this.startTime=performance.now(),this.callbacks.onTimerUpdate(_(e))},250)}stopTimer(){this.timerInterval!==null&&(clearInterval(this.timerInterval),this.timerInterval=null),!this.state.isPaused&&this.startTime>0&&(this.accumulatedMs+=performance.now()-this.startTime),this.startTime=0}handleKeyPress(e,t){if(!this.currentQuestion||this.state.isFinished||this.state.isPaused)return!1;let n=t?ce(this.currentQuestion,t):x(this.currentQuestion,e);return n?(this.state.correctCount++,this.state.streak++,this.state.score+=10*(1+Math.floor(this.state.streak/5)),this.state.maxStreak=Math.max(this.state.maxStreak,this.state.streak),this.callbacks.onCorrect(this.currentQuestion),this.callbacks.onScoreChange(this.state.score),this.state.streak>0&&this.state.streak%5==0&&this.callbacks.onStreak(this.state.streak),this.nextQuestion()):(this.state.wrongCount++,this.state.streak=0,this.callbacks.onWrong(this.currentQuestion,e)),n}nextQuestion(){if(this.state.currentIndex>=this.state.totalQuestions){this.state.isFinished=!0,this.state.elapsedMs=this.getElapsedMs(),this.stopTimer(),this.callbacks.onFinish({...this.state});return}this.currentQuestion=this.generateQuestion(),this.usedKeys.push(this.currentQuestion.key),this.state.currentIndex++,this.callbacks.onQuestion(this.currentQuestion)}generateQuestion(){switch(this.mode){case`alphabet`:return ne(this.alphabetIndex++);case`number`:return re(this.usedKeys);case`full`:return ie(this.usedKeys);default:return te(this.usedKeys)}}getState(){return{...this.state,elapsedMs:this.getElapsedMs()}}getCurrentQuestion(){return this.currentQuestion}stop(){this.state.isFinished=!0,this.state.elapsedMs=this.getElapsedMs(),this.stopTimer()}},ue=class{state;currentWord=null;currentCharIndex=0;callbacks;totalWordsCompleted=0;startTime=0;accumulatedMs=0;timerInterval=null;constructor(e){this.callbacks=e,this.state=g(`word`)}start(){this.state=g(`word`),this.totalWordsCompleted=0,this.accumulatedMs=0,this.startTime=performance.now(),this.state.isPaused=!1,this.startTimer(),this.nextWord(),this.callbacks.onTimerUpdate(`00:00.00`)}pause(){this.state.isPaused||this.state.isFinished||(this.state.isPaused=!0,this.stopTimer(),this.callbacks.onPauseChange(!0))}resume(){!this.state.isPaused||this.state.isFinished||(this.state.isPaused=!1,this.startTime=performance.now(),this.startTimer(),this.callbacks.onPauseChange(!1))}togglePause(){this.state.isPaused?this.resume():this.pause()}getElapsedMs(){return this.state.isPaused?this.accumulatedMs:this.accumulatedMs+(performance.now()-this.startTime)}startTimer(){this.timerInterval!==null&&(clearInterval(this.timerInterval),this.timerInterval=null),this.timerInterval=setInterval(()=>{let e=this.getElapsedMs();this.accumulatedMs=e,this.startTime=performance.now(),this.callbacks.onTimerUpdate(_(e))},250)}stopTimer(){this.timerInterval!==null&&(clearInterval(this.timerInterval),this.timerInterval=null),!this.state.isPaused&&this.startTime>0&&(this.accumulatedMs+=performance.now()-this.startTime),this.startTime=0}handleKeyPress(e){if(!this.currentWord||this.state.isFinished||this.state.isPaused||this.currentCharIndex>=this.currentWord.word.length)return!1;let t=this.currentWord.questions[this.currentCharIndex];if(!t)return!1;let n=x(t,e);if(n){if(this.state.correctCount++,this.state.streak++,this.state.score+=10,this.state.maxStreak=Math.max(this.state.maxStreak,this.state.streak),this.callbacks.onCharCorrect(this.currentCharIndex,t),this.callbacks.onScoreChange(this.state.score),this.currentCharIndex++,this.currentCharIndex>=this.currentWord.word.length){this.totalWordsCompleted++;let e=this.state.score;this.callbacks.onWordComplete(this.currentWord.word,e),this.state.streak>0&&this.state.streak%5==0&&this.callbacks.onStreak(this.state.streak),this.totalWordsCompleted>=this.state.totalQuestions?(this.state.isFinished=!0,this.state.elapsedMs=this.getElapsedMs(),this.stopTimer(),this.callbacks.onFinish({...this.state})):setTimeout(()=>this.nextWord(),800)}}else this.state.wrongCount++,this.state.streak=0,this.callbacks.onCharWrong(this.currentCharIndex,t,e);return n}nextWord(){this.currentWord=oe(),this.currentCharIndex=0,this.state.currentIndex=this.totalWordsCompleted+1,this.callbacks.onWordStart(this.currentWord)}getState(){return{...this.state,elapsedMs:this.getElapsedMs()}}getCurrentWord(){return this.currentWord}getCurrentCharIndex(){return this.currentCharIndex}stop(){this.state.isFinished=!0,this.state.elapsedMs=this.getElapsedMs(),this.stopTimer()}},S=t({loadProgress:()=>T,saveProgress:()=>E,updateProgress:()=>D}),C=`keyboard-learn-progress`;function w(){return{totalScore:0,totalCorrect:0,totalWrong:0,maxStreak:0,familiarBestScore:0,wordBestScore:0,alphabetBestScore:0,numberBestScore:0,fullBestScore:0,stars:0,practiceCount:0,lastPracticeDate:``}}function T(){try{let e=localStorage.getItem(C);if(e)return{...w(),...JSON.parse(e)}}catch{}return w()}function E(e){try{localStorage.setItem(C,JSON.stringify(e))}catch{}}function D(e,t,n,r,i){let a=T();return a.totalScore+=t,a.totalCorrect+=n,a.totalWrong+=r,a.maxStreak=Math.max(a.maxStreak,i),a.practiceCount++,e===`familiar`?a.familiarBestScore=Math.max(a.familiarBestScore,t):e===`word`?a.wordBestScore=Math.max(a.wordBestScore,t):e===`alphabet`?a.alphabetBestScore=Math.max(a.alphabetBestScore,t):e===`number`?a.numberBestScore=Math.max(a.numberBestScore,t):e===`full`&&(a.fullBestScore=Math.max(a.fullBestScore,t)),a.stars=Math.floor(a.totalScore/100),a.lastPracticeDate=new Date().toISOString().split(`T`)[0],E(a),a}function O(e){let t=document.createElement(`div`);t.className=`feedback-correct`,t.innerHTML=`
    <div class="feedback-icon">✅</div>
    <div class="feedback-stars">
      ${[,,,].fill(0).map((e,t)=>`<span class="star-particle" style="animation-delay:${t*.1}s">⭐</span>`).join(``)}
    </div>
  `,e.appendChild(t),setTimeout(()=>t.remove(),1e3)}function k(e,t){let n=document.createElement(`div`);n.className=`feedback-wrong`,n.innerHTML=`
    <div class="feedback-icon">❌</div>
    <div class="feedback-hint">${t}</div>
  `,e.appendChild(n),setTimeout(()=>n.remove(),1200)}function de(e,t){let n=document.createElement(`div`);n.className=`feedback-streak`,n.innerHTML=`
    <div class="streak-fireworks">
      ${[,,,,,,].fill(0).map((e,t)=>`<span class="firework" style="--angle:${t*60}deg">🎉</span>`).join(``)}
    </div>
    <div class="streak-text">🔥 连击 ${t}！太棒了！🔥</div>
  `,e.appendChild(n),setTimeout(()=>n.remove(),2e3)}function A(e,t,n,r){let i=fe(t.score,t.totalQuestions),a=[,,,,,].fill(0).map((e,t)=>t<i?`⭐`:`☆`).join(``),o=v(t.elapsedMs),s=t.mode===`word`?`单词`:`字母`,c=(t.mode,t.totalQuestions),l=v(c>0?t.elapsedMs/c:0);e.innerHTML=`
    <div class="finish-screen">
      <div class="finish-title">🎉 练习完成！</div>
      <div class="finish-rating">${a}</div>
      <div class="finish-stats">
        <div class="stat-item">
          <span class="stat-label">得分</span>
          <span class="stat-value">${t.score}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">正确</span>
          <span class="stat-value correct">${t.correctCount}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最大连击</span>
          <span class="stat-value streak">${t.maxStreak}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">总用时</span>
          <span class="stat-value time">${o}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">平均/${s}</span>
          <span class="stat-value time">${l}</span>
        </div>
      </div>
      <div class="finish-actions">
        <button class="btn btn-primary" id="btn-restart">再来一次</button>
        <button class="btn btn-secondary" id="btn-back">返回菜单</button>
      </div>
    </div>
  `;let u=e=>()=>{document.removeEventListener(`keydown`,d),e()};e.querySelector(`#btn-restart`)?.addEventListener(`click`,u(n)),e.querySelector(`#btn-back`)?.addEventListener(`click`,u(r));let d=e=>{e.key===`Enter`?u(n)():e.key===`Escape`&&u(r)()};document.addEventListener(`keydown`,d)}function fe(e,t){let n=e/(t*10);return n>=.95?5:n>=.8?4:n>=.6?3:n>=.4?2:1}var j=`menu`,M=null,N=null,P=null,F=null;function pe(){o(I)}function I(e){switch(e){case`familiar`:L(`familiar`,`键盘熟习练习`);break;case`alphabet`:L(`alphabet`,`按字母顺序练习`);break;case`number`:L(`number`,`数字键练习`);break;case`full`:L(`full`,`全键盘练习`);break;case`word`:B();break}}function L(e,t){P?.stop(),F?.stop(),P=null,F=null,j=e;let n=document.getElementById(`app`);n.innerHTML=R(t,e);let r=document.getElementById(`keyboard-canvas`),i=document.getElementById(`finger-canvas`);M=new m({canvas:r}),N=new h({canvas:i}),P=new le({onQuestion:e=>z(e),onCorrect:e=>me(e),onWrong:(e,t)=>he(e,t),onStreak:e=>H(e),onFinish:t=>ge(t,e),onScoreChange:e=>U(e),onTimerUpdate:e=>W(e),onPauseChange:e=>G(e)},e),n.querySelector(`#btn-back`)?.addEventListener(`click`,()=>{P?.stop(),$(),o(I)}),n.querySelector(`#btn-pause`)?.addEventListener(`click`,()=>{P?.togglePause()}),P.start(),J(),K()}function R(e,t){return`
    <div class="practice-container">
      <div class="pause-overlay" id="pause-overlay" style="display:none;">
        <div class="pause-icon">⏸️</div>
        <div class="pause-text">已暂停</div>
        <div class="pause-hint">按 空格键 或点击 ▼ 继续</div>
      </div>

      <div class="practice-header">
        <button class="btn btn-back" id="btn-back">← 返回</button>
        <span class="practice-mode-label">${e}</span>
        <div class="practice-hud">
          <div class="hud-item">
            <span class="hud-label">用时</span>
            <span class="hud-value timer" id="timer-display">00:00.00</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">分数</span>
            <span class="hud-value" id="score-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">连击</span>
            <span class="hud-value streak" id="streak-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">进度</span>
            <span class="hud-value" id="progress-display">1/${t===`alphabet`?26:t===`number`||t===`familiar`?20:30}</span>
          </div>
        </div>
        <button class="btn btn-pause" id="btn-pause" title="暂停/继续">⏯️</button>
      </div>

      <div class="practice-body">
        <div class="question-area" id="question-area">
          <div class="question-hint" id="question-hint">准备好开始了吗？</div>
          <div class="question-key" id="question-key">?</div>
          <div class="question-finger" id="question-finger"></div>
        </div>

        <div class="canvas-area">
          <div class="finger-canvas-wrapper">
            <canvas id="finger-canvas"></canvas>
            <div class="canvas-label">手指位置示意</div>
          </div>
          <div class="keyboard-canvas-wrapper">
            <canvas id="keyboard-canvas"></canvas>
            <div class="canvas-label">键盘布局</div>
          </div>
        </div>
      </div>

      <div class="feedback-container" id="feedback-container"></div>
    </div>
  `}function z(e){let t=document.getElementById(`question-hint`),n=document.getElementById(`question-key`),r=document.getElementById(`question-finger`),i=document.getElementById(`progress-display`);if(t&&(t.textContent=e.hint),n&&(n.textContent=e.key.toUpperCase(),n.style.color=e.fingerColor),r&&(r.textContent=e.fingerName,r.style.color=e.fingerColor),i&&P){let e=P.getState();i.textContent=`${e.currentIndex}/${e.totalQuestions}`}M?.highlight(e.key,e.finger),N?.activateFinger(e.finger)}function me(e){let t=document.getElementById(`feedback-container`);t&&O(t),M?.showPress(e.key)}function he(e,t){let n=document.getElementById(`feedback-container`);n&&k(n,`按了 "${t.toUpperCase()}"，请用${e.fingerName}按 "${e.key.toUpperCase()}"`)}function ge(e,t){let n=P?.getState();n&&D(t,n.score,n.correctCount,n.wrongCount,n.maxStreak),A(document.getElementById(`app`),{...e,mode:t},()=>{L(t,{familiar:`键盘熟习练习`,alphabet:`按字母顺序练习`,number:`数字键练习`,full:`全键盘练习`}[t]||``)},()=>{$(),o(I)})}function B(){P?.stop(),F?.stop(),P=null,F=null,j=`word`;let e=document.getElementById(`app`);e.innerHTML=_e();let t=document.getElementById(`keyboard-canvas`),n=document.getElementById(`finger-canvas`);M=new m({canvas:t}),N=new h({canvas:n}),F=new ue({onWordStart:e=>ve(e),onCharCorrect:(e,t)=>ye(e,t),onCharWrong:(e,t,n)=>be(e,t,n),onWordComplete:(e,t)=>xe(e,t),onStreak:e=>H(e),onFinish:e=>Se(e),onScoreChange:e=>U(e),onTimerUpdate:e=>W(e),onPauseChange:e=>G(e)}),e.querySelector(`#btn-back`)?.addEventListener(`click`,()=>{F?.stop(),$(),o(I)}),e.querySelector(`#btn-pause`)?.addEventListener(`click`,()=>{F?.togglePause()}),F.start(),J(),K()}function _e(){return`
    <div class="practice-container">
      <div class="pause-overlay" id="pause-overlay" style="display:none;">
        <div class="pause-icon">⏸️</div>
        <div class="pause-text">已暂停</div>
        <div class="pause-hint">按 空格键 或点击 ▼ 继续</div>
      </div>

      <div class="practice-header">
        <button class="btn btn-back" id="btn-back">← 返回</button>
        <div class="practice-hud">
          <div class="hud-item">
            <span class="hud-label">用时</span>
            <span class="hud-value timer" id="timer-display">00:00.00</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">分数</span>
            <span class="hud-value" id="score-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">连击</span>
            <span class="hud-value streak" id="streak-display">0</span>
          </div>
          <div class="hud-item">
            <span class="hud-label">单词</span>
            <span class="hud-value" id="progress-display">1/10</span>
          </div>
        </div>
        <button class="btn btn-pause" id="btn-pause" title="暂停/继续">⏯️</button>
      </div>

      <div class="practice-body">
        <div class="word-display-area" id="word-display-area">
          <div class="word-label">请输入单词：</div>
          <div class="word-letters" id="word-letters"></div>
        </div>

        <div class="canvas-area">
          <div class="finger-canvas-wrapper">
            <canvas id="finger-canvas"></canvas>
            <div class="canvas-label">手指位置示意</div>
          </div>
          <div class="keyboard-canvas-wrapper">
            <canvas id="keyboard-canvas"></canvas>
            <div class="canvas-label">键盘布局</div>
          </div>
        </div>
      </div>

      <div class="feedback-container" id="feedback-container"></div>
    </div>
  `}function ve(e){let t=document.getElementById(`word-letters`),n=document.getElementById(`progress-display`);if(t&&(t.innerHTML=e.word.split(``).map((e,t)=>`<span class="word-letter" data-index="${t}" id="letter-${t}">${e.toUpperCase()}</span>`).join(``)),n&&F){let e=F.getState();n.textContent=`${e.currentIndex}/${e.totalQuestions}`}V(0)}function V(e){document.querySelectorAll(`.word-letter`).forEach(e=>{e.classList.remove(`active`,`correct`,`wrong`)});let t=document.getElementById(`letter-${e}`);t&&t.classList.add(`active`);let n=F?.getCurrentWord();if(n&&n.questions[e]){let t=n.questions[e];M?.highlight(t.key,t.finger),N?.activateFinger(t.finger)}}function ye(e,t){let n=document.getElementById(`letter-${e}`);n&&(n.classList.remove(`active`),n.classList.add(`correct`));let r=document.getElementById(`feedback-container`);r&&O(r),M?.showPress(t.key),setTimeout(()=>V(e+1),200)}function be(e,t,n){let r=document.getElementById(`letter-${e}`);r&&(r.classList.add(`wrong`),setTimeout(()=>r.classList.remove(`wrong`),300));let i=document.getElementById(`feedback-container`);i&&k(i,`按了 "${n.toUpperCase()}"`)}function xe(e,t){let n=document.getElementById(`feedback-container`);if(n){let t=document.createElement(`div`);t.className=`feedback-word-complete`,t.innerHTML=`🎉 太棒了！"${e.toUpperCase()}" 输入完成！`,n.appendChild(t),setTimeout(()=>t.remove(),1e3)}}function Se(e){let t=F?.getState();t&&D(`word`,t.score,t.correctCount,t.wrongCount,t.maxStreak),A(document.getElementById(`app`),{...e,mode:`word`},()=>B(),()=>{$(),o(I)})}function H(e){let t=document.getElementById(`feedback-container`);t&&de(t,e);let n=document.getElementById(`streak-display`);n&&(n.classList.add(`streak-pop`),setTimeout(()=>n.classList.remove(`streak-pop`),500))}function U(e){let t=document.getElementById(`score-display`);t&&(t.textContent=String(e));let n=document.getElementById(`streak-display`);if(n){let e=P?.getState()||F?.getState();n&&e&&(n.textContent=String(e.streak))}}function W(e){let t=document.getElementById(`timer-display`);t&&(t.textContent=e)}function G(e){let t=document.getElementById(`pause-overlay`),n=document.getElementById(`btn-pause`);t&&(t.style.display=e?`flex`:`none`),n&&(n.textContent=e?`▶️`:`⏯️`)}function K(){document.removeEventListener(`keydown`,q),document.addEventListener(`keydown`,q)}function q(e){if(e.key!==` `&&e.code!==`Space`)return;let t=P||F;if(!(!t||t.getState().isFinished)){if(P){let e=P.getCurrentQuestion();if(e&&(e.key===` `||e.key===`Space`))return}e.preventDefault(),t.togglePause()}}function J(){document.removeEventListener(`keydown`,Q),document.removeEventListener(`keyup`,Z),document.removeEventListener(`contextmenu`,X),setTimeout(()=>{document.addEventListener(`keydown`,Q),document.addEventListener(`keyup`,Z),document.addEventListener(`contextmenu`,X)},100)}function Y(){return j===`full`&&P!==null&&!P.getState().isFinished&&!P.getState().isPaused}function X(e){Y()&&e.preventDefault()}function Z(e){Y()&&e.preventDefault()}function Q(e){if(Y()){if(e.preventDefault(),e.key===` `||e.code===`Space`){let e=P.getCurrentQuestion();e&&(e.key===` `||e.key===`Space`)&&P.handleKeyPress(`Space`);return}P.handleKeyPress(e.key,e.code);return}if(e.key===` `||e.code===`Space`){if(P&&!P.getState().isFinished&&!P.getState().isPaused){let t=P.getCurrentQuestion();if(t&&(t.key===` `||t.key===`Space`)){e.preventDefault(),P.handleKeyPress(`Space`);return}}return}if(j===`word`&&F){let t=document.activeElement;(!t||t===document.body||t.tagName===`BUTTON`)&&(e.preventDefault(),F.handleKeyPress(e.key))}else P&&(e.preventDefault(),P.handleKeyPress(e.key))}function $(){document.removeEventListener(`keydown`,Q),document.removeEventListener(`keyup`,Z),document.removeEventListener(`contextmenu`,X),document.removeEventListener(`keydown`,q)}pe();