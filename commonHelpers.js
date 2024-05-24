import{a as y,S,i as f}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const g of a.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();y.defaults.baseURL="https://pixabay.com";const M={query:"",perPage:15,maxPage:1,currentPage:1};async function b(e,t){const n="43980241-153c3487497bc06835a433946";return(await y.get("/api/",{params:{key:n,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:t}})).data}function q(e){return`<div class="gallery-item">
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
</div>`}function x(e){return e.map(q).join("")}function L(e,t){const n=x(t);e.insertAdjacentHTML("beforeend",n)}function I(e,t){let n='<li data-type="prev" class="pagination-item btn">&laquo;</li>',r=1,o=t;t>7&&(e>4&&(n+='<li class="dots">&nbsp;. . .&nbsp;</li>',r=e-2),e<t-3&&(o=e+2));for(let a=r;a<=o;a+=1)n+=`<li data-type="page" data-page="${a}" class="pagination-item btn ${e===a?"active":""}">${a}</li>`;return o<t&&(n+='<li class="dots">&nbsp;. . .&nbsp;</li>'),n+='<li data-type="next" class="pagination-item btn">&raquo;</li>',n}const $="/goit-js-hw-12/assets/icon-error-9956cb73.svg";let{query:l,perPage:O,maxPage:u,currentPage:s}=M,v;const i={form:document.querySelector(".js-form"),containerImg:document.querySelector(".js-container-images"),body:document.body,cssLoader:document.querySelector(".js-loader"),btnLoadMore:document.querySelector(".js-btn-load-more"),pagination:document.querySelector(".js-pagination")},w=new S(".js-container-images a",{captionsData:"alt",captionPosition:"bottom",captionClass:"caption-text"});i.form.addEventListener("submit",k);i.btnLoadMore.addEventListener("click",F);i.pagination.addEventListener("click",H);function k(e){e.preventDefault();const t=e.target;if(i.body.style.height="100vh",i.containerImg.innerHTML="",s=1,l=t.elements.query.value.trim(),l===""){p({text:"Fill in the field!"});return}l=l.replaceAll(" ","+"),m(l),t.reset()}async function m(e){d(i.cssLoader),c(i.btnLoadMore),c(i.pagination);try{const t=await b(e,s);!t.hits||t.hits.length===0?p({text:"Sorry, there are no images matching your<br> search query. Please, try again!"}):(u=Math.ceil(t.totalHits/O),v=t.hits,L(i.containerImg,t.hits),d(i.pagination),d(i.btnLoadMore),E(s,u),t.hits.length<4?(i.body.style.height="100vh",c(i.btnLoadMore)):i.body.style.height="100%",w.refresh())}catch(t){p({text:"An error occurred. Please try again later.",title:`Error ${t.status}:`})}finally{c(i.cssLoader)}P()}async function F(){c(i.btnLoadMore),d(i.cssLoader);try{s+=1;const e=await b(l,s);L(i.containerImg,e.hits),d(i.btnLoadMore),C(),E(s,u),w.refresh()}catch(e){console.log(e)}finally{c(i.cssLoader)}P()}function H(e){const t=i.pagination.querySelector(".active"),n=e.target;if(n.dataset.type==="page"){const r=parseInt(n.dataset.page);r!==s&&(s=r,i.containerImg.innerHTML="",i.body.style.height="100vh",m(l))}n.dataset.type==="prev"&&t.previousElementSibling.dataset.type==="page"&&h(n,t),n.dataset.type==="next"&&t.nextElementSibling.dataset.type==="page"&&h(n,t)}function h(e,t){if(t.classList.remove("active"),e.dataset.type==="page"){e.classList.add("active");return}e.dataset.type==="next"?(t.nextElementSibling.classList.add("active"),s+=1):(t.previousElementSibling.classList.add("active"),s-=1),!(s<1||s>u)&&(i.containerImg.innerHTML="",i.body.style.height="100vh",m(l))}function E(e,t){i.pagination.innerHTML=I(e,t)}function P(){if(s>=u){if(c(i.btnLoadMore),v.length<4)return;p({text:"We're sorry, but you've reached the end of search results.",type:"info"})}}function d(e){e.classList.remove("visually-hidden")}function c(e){e.classList.add("visually-hidden")}function p({text:e,title:t=null,type:n="error"}){switch(f.settings({timeout:5e3,closeOnEscape:!0,transitionIn:"fadeInLeft",transitionOut:"fadeOutUp",titleSize:"16",titleLineHeight:"24",messageSize:"16",messageLineHeight:"24",position:"topRight"}),n){case"info":f.info({message:e}),document.querySelector(".iziToast-close").classList.add("custom-close");break;default:const o={message:e,backgroundColor:"#EF4040",iconUrl:$,titleColor:"#FFF",messageColor:"#FFF"};t!==null&&(o.title=`${t}`),f.show(o)}}function C(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
