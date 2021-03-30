---
title: "About"
subtitle: "Learn More or Contact"
headline: "Denis Labrecque is a finishing student in Graphic Design and Information Technology at Pensacola Christian College. He has been successful on all semesters of attendance and has graduated cum laude in December 2020. After his education, he hopes to continue as a programmer."
ctaTitle: "Résumé"
ctaLink: "/resume/"
date: 2020-11-26T21:51:14-06:00
draft: false
author: "Denis Labrecque"
blank: true
---
<section class="margined">
<p>When he was very young, Denis enjoyed drawing airplanes and rolling a miniature steam engine around to understand how the wheels paired together. Eventually, his curiosity grew towards graphics, piqued by a book explaining how to design websites. He has since been imagining user interfaces by creating small apps on the side, by working as a web designer, and by working as a programmer. From this work, one of his designs has been printed over 100,000 times; his programming has also helped maintain websites with over 3 million yearly users. He hopes to continue being useful in improving software user experiences for his future organization.</p>

{{< image "DenisTransparentBackground.png" "Denis Labrecque" >}}

<p>Because Denis’ interests range from composing orchestral music to using 3D software, and building electronics to making scale models, your project likely interests him! If you want help, you are welcome to contact him below.<p>
</section>

<section class="red diagonal-both" id="contact">
  <div class="margined slide-anim" data-anim="bottom top">
    <p class="hero">Contact Me</p>
    <form>
      <label>Email</label>
      <input type="email" id="emailField" />
      <label>Subject</label>
      <input id="subjectField">
      <label>Message</label>
      <textarea id="messageField"></textarea>
    </form>
    <a class="button" id="sendEmail" onclick="sendEmail()">Send</a>
  </div>
  <script>
    let email = ''
    let subject = ''
    let message = ''
    let fld_email = document.querySelector('#emailField')
    let fld_subject = document.querySelector('#subjectField')
    let txt_message = document.querySelector('#messageField')
    let btn_send = document.querySelector('#sendEmail')
    console.log('Email:')
    console.log(fld_email)
    console.log(fld_email.value)
    function sendEmail() {
      console.log(fld_email.value)
      console.log(fld_subject.value)
      console.log(txt_message.value)
      let mail = document.createElement("a")
      mail.href = 'mailto:' + encodeURI(fld_email.value) + '?subject=' + encodeURIComponent(fld_subject.value) + '&body=' + encodeURIComponent(txt_message.value)
      mail.click();
    }
  </script>
</section>

<section class="margined">
    <blockquote>
      <span class="highlight">If I had to describe Denis in two words, I would say would say working and creative. His desire to always find the best solution to the problem is truly one of his talents.</span>
      <cite>Maxime Pronovost, Owner of Studio Grafik</cite>
    </blockquote>
</section>