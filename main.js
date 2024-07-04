(()=>{"use strict";var e,t="Escape";function n(e){e.key===t&&c()}function o(t){(e===t.target||t.target.classList.contains("popup__close"))&&c()}function r(t){e=t,t.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("click",o),document.addEventListener("keydown",n)}function c(){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),document.removeEventListener("click",o),e=null}function i(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.inputErrorTextColor),o.textContent=""}function a(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.disabled=!1:t.disabled=!0}function u(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){return i(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);null!=n&&(n.disabled=!0)}function l(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var s,d,p="https://nomoreparties.co/v1/wff-cohort-17",f="e184ef3f-b81c-46e4-b802-f92c44d2ab87";function _(e){var t=e.target.parentElement.querySelector(".cardId").textContent;return fetch("".concat(p,"/cards/").concat(t),{method:"DELETE",headers:{authorization:f}}).then(l)}function m(e){return s=e.target,d=s.closest(".places__item").querySelector(".cardId").textContent,fetch("".concat(p,"/cards/likes/").concat(d),{method:"PUT",headers:{authorization:f}}).then(l)}function v(e){_(e).then((function(t){e.target.closest(".card").remove()})).catch((function(e){console.log(e)}))}function y(e){e.target.classList.contains("card__like-button_is-active")?function(e){return s=e.target,d=s.closest(".places__item").querySelector(".cardId").textContent,fetch("".concat(p,"/cards/likes/").concat(d),{method:"DELETE",headers:{authorization:f}}).then(l)}(e).then((function(e){s.parentElement.querySelector(".like__counter").textContent=e.likes.length,s.classList.remove("card__like-button_is-active")})).catch((function(e){console.log(e)})):m(e).then((function(e){s.parentElement.querySelector(".like__counter").textContent=e.likes.length,s.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))}var h,S=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),E=document.querySelector(".profile__image"),g=document.querySelector(".edit__avatar"),k=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_image"),L=document.querySelector(".popup_update_avatar"),x=document.forms.editProfile,T=x.elements.name,A=x.elements.description,z=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),P=document.forms.newPlace,D=P.elements.placeName,j=P.elements.link,N=document.forms.editAvatar,I=N.elements.avatarLink,O=document.querySelector(".places__list"),B=document.querySelector(".popup__image"),J=document.querySelector(".popup__caption"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",inputErrorTextColor:"popup__input-error"};function H(e){!function(e){var t=e.target;J.textContent=t.closest(".places__item").querySelector(".card__title").textContent,B.src=t.src,B.alt=t.alt}(e),r(C)}function V(e,t,n,o,r){var c=function(e,t,n){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0);!function(e,t,n){e.querySelector(".card__image").src=t.link,e.querySelector(".card__title").textContent=t.name,e.querySelector(".card__image").alt=t.alt,e.querySelector(".like__counter").textContent=t.likes.length,e.querySelector(".cardId").textContent=t._id,t.likes.forEach((function(t){t._id==n._id&&e.querySelector(".card__like-button").classList.add("card__like-button_is-active")}))}(o,e,n);var r=o.querySelector(".card__delete-button");return r.addEventListener("click",v),n._id!=e.owner._id&&(r.style.visibility="hidden"),o.querySelector(".card__like-button").addEventListener("click",y),o.querySelector(".card__image").addEventListener("click",t),o}(e,o,h);r?O.prepend(c):O.append(c)}function U(){Array.from(e.querySelectorAll(M.inputSelector)).forEach((function(e){e.value=""}))}function F(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?o:n}S.addEventListener("click",(function(t){r(k),T.value=z.textContent,A.value=w.textContent,u(e,M)})),q.addEventListener("click",(function(t){r(b),U(),u(e,M)})),E.addEventListener("click",(function(t){r(L),U(),u(e,M)})),g.addEventListener("click",(function(t){r(L),U(),u(e,M)})),x.addEventListener("submit",(function(t){t.preventDefault();var n,o,r=e.querySelector(".popup__button");F(!0,r),(n=T.value,o=A.value,fetch("".concat(p,"/users/me"),{method:"PATCH",headers:{authorization:f,"Content-Type":"application/json"},body:JSON.stringify({name:n,about:o})}).then(l)).then((function(e){z.textContent=T.value,w.textContent=A.value,c()})).catch((function(e){console.log(e)})).finally((function(){F(!1,r)}))})),P.addEventListener("submit",(function(t){t.preventDefault();var n,o,r=e.querySelector(".popup__button");F(!0,r),(n=j.value,o=D.value,fetch("".concat(p,"/cards"),{method:"POST",headers:{authorization:f,"Content-Type":"application/json"},body:JSON.stringify({link:n,name:o})}).then(l)).then((function(e){V({link:e.link,name:e.name,_id:e._id,likes:[],owner:{_id:h._id}},0,0,H,!0),c()})).catch((function(e){console.log(e)})).finally((function(){F(!1,r)})),t.target.reset()})),N.addEventListener("submit",(function(t){t.preventDefault();var n,o=e.querySelector(".popup__button");F(!0,o),(n=I.value,fetch("".concat(p,"/users/me/avatar"),{method:"PATCH",headers:{authorization:f,"Content-Type":"application/json"},body:JSON.stringify({avatar:n})}).then(l)).then((function(e){document.querySelector(".profile__image").src=I.value,c()})).catch((function(e){console.log(e)})).finally((function(){F(!1,o)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);a(n,o),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.inputErrorTextColor)}(e,t,t.validationMessage,n)}(e,r,t),a(n,o)}))}))}(t,e)}))}(M),fetch("".concat(p,"/users/me"),{headers:{authorization:f}}).then(l).then((function(e){z.textContent=e.name,w.textContent=e.about,document.querySelector(".profile__image").src=e.avatar,h=e,fetch("".concat(p,"/cards"),{headers:{authorization:f}}).then(l).then((function(e){e.forEach((function(e){return V(e,0,0,H,!1)}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})();