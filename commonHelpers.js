import{S as c,i as u}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();function f(e){const o="https://pixabay.com",i="/api/",a="43980241-153c3487497bc06835a433946",t=new URLSearchParams({key:a,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true"}),r=`${o}${i}?${t}`;return fetch(r).then(n=>{if(!n.ok)throw new Error(n.status);return n.json()})}function m(e){return`<div class="gallery-item">
  <a href="${e.largeImageURL}">
    <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
  </a>
  <ul class="block-info">
    <li>
      <p style="font-weight: 600">Likes</p>
      <p>${e.likes}</p>
    </li>

    <li>
      <p style="font-weight: 600">Views</p>
      <p>${e.views}</p>
    </li>

    <li>
      <p style="font-weight: 600">Comments</p>
      <p>${e.comments}</p>
    </li>

    <li>
      <p style="font-weight: 600">Downloads</p>
      <p>${e.downloads}</p>
    </li>
  </ul>
</div>`}function p(e){return e.map(m).join("")}const h="/goit-js-hw-12/assets/icon-error-9956cb73.svg",s={form:document.querySelector(".js-form"),containerImg:document.querySelector(".js-container-images"),body:document.body,cssLoader:document.querySelector(".js-loader")},d=new c(".js-container-images a",{captionsData:"alt",captionPosition:"bottom",captionClass:"caption-text"});s.form.addEventListener("submit",g);function g(e){e.preventDefault(),s.body.style.height="100vh",s.containerImg.innerHTML="";let o=e.target.elements.query.value.trim();if(o===""){l("Fill in the field!");return}o=o.replaceAll(" ","+"),y(),f(o).then(i=>{if(i.hits.length===0)l("Sorry, there are no images matching your<br> search query. Please, try again!");else{const a=p(i.hits);s.containerImg.innerHTML=a,i.hits.length<4?s.body.style.height="100vh":s.body.style.height="100%",d.refresh()}}).catch(i=>{l("An error occurred. Please try again later.",i)}).finally(()=>{L()}),e.target.reset()}function y(){s.cssLoader.style.display="block"}function L(){s.cssLoader.style.display="none"}function l(e,o=null){const i={message:e,backgroundColor:"#EF4040",iconUrl:h,timeout:5e3,closeOnEscape:!0,transitionIn:"fadeInLeft",transitionOut:"fadeOutUp",titleSize:"16",titleLineHeight:"24",messageSize:"16",messageLineHeight:"24",titleColor:"#FFF",messageColor:"#FFF",position:"topRight"};o!==null&&(i.title=`${o}`),u.show(i)}
//# sourceMappingURL=commonHelpers.js.map
