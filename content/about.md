---
title: "Contact"
headline: "Denis is available to respond to queries and work on projects. If you need help with your programming or graphics job, send him a message below."
ctaTitle: "LinkedIn"
ctaLink: "https://www.linkedin.com/in/denisglabrecque/?locale=en_US"
date: 2020-11-26T21:51:14-06:00
draft: false
author: "Denis Labrecque"
blank: true
---
<section class="margined" id="contact">
  <div class="contact-content">
    <form>
      <label for="subjectField"><strong>Subject</strong></label>
      <input id="subjectField">
      <label for="messageField"><strong>Message</strong></label>
      <textarea id="messageField"></textarea>
    </form>
    <a class="button" id="sendEmail" onclick="sendEmail()">Send</a>
  </div>
  <div class="circle__box hidden">
    <p>Thanks! Sent to your email program.</p>
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

<section class="margined">
  <h2>About</h2>
  <p>When he was very young, Denis enjoyed drawing airplanes and rolling a miniature steam engine around to understand how the wheels paired together. Eventually, his curiosity grew towards graphics, piqued by a book explaining how to design websites. He has since been imagining user interfaces by creating small apps on the side, by working as a web designer, and by working as a programmer.</p>
  <p>One of Denis' designs has been printed over 100,000 times; his programming has also helped maintain websites with over 3 million yearly users. He hopes to continue being useful in improving software user experiences for his future organization.</p>

  {{< image "DenisTransparentBackground.png" "Denis Labrecque" >}}

  <p>Because Denis’ interests range from composing orchestral music to using 3D software, and building electronics to making scale models, your project likely interests him! If you want help, you are welcome to <a href="#contact">contact him</a>.<p>
</section>

<section class="margined">
    <blockquote>
      <span class="highlight">If I had to describe Denis in two words, I would say would say working and creative. His desire to always find the best solution to the problem is truly one of his talents.</span>
      <cite>Maxime Pronovost, Owner of Studio Grafik</cite>
    </blockquote>
</section>