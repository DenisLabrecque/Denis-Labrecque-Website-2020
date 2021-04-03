---
title: "Contacter"
headline: "Denis est disponible pour répondre à toute question et pour travailler sur des projets. Si vous avez besoin d'aide sur vos travaux de programmation ou de graphisme, envoyez-lui un message."
ctaTitle: "LinkedIn"
ctaLink: "https://www.linkedin.com/in/denisglabrecque/?locale=fr_FR"
date: 2020-11-26T21:51:14-06:00
draft: false
author: "Denis Labrecque"
blank: true
---
<section class="margined" id="contact">
  <div class="contact-content">
    <form>
      <label for="subjectField"><strong>Sujet</strong></label>
      <input id="subjectField">
      <label for="messageField"><strong>Message</strong></label>
      <textarea id="messageField"></textarea>
    </form>
    <a class="button" id="sendEmail" onclick="sendEmail()">Evoyer</a>
  </div>
  <div class="circle__box hidden">
    <p>Merci! Envoyé à votre programme courriel.</p>
    <div class="circle__wrapper circle__wrapper--right">
      <div class="circle__whole circle__right"></div>
    </div>
    <div class="circle__wrapper circle__wrapper--left">
      <div class="circle__whole circle__left"></div>
    </div>
  </div>
  <script>
    let div_container = document.querySelector('div.contact-content')
    let fld_subject = document.querySelector('#subjectField')
    let txt_message = document.querySelector('#messageField')
    let btn_send = document.querySelector('#sendEmail')
    let div_confirmation = document.querySelector('div.circle__box')
    function sendEmail() {
      let mail = document.createElement("a")
      mail.href = 'mailto:denis.g.labrecque@gmail.com?subject=' + encodeURIComponent(fld_subject.value) + '&body=' + encodeURIComponent(txt_message.value)
      mail.click();
      div_confirmation.classList.remove('hidden')
      div_container.style.display = 'none'
    }
  </script>
</section>