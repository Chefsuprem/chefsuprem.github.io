
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

  event.preventDefault();

  //Se connecter au serveur
  //Email.server = {
  //  host: "smtp.elasticemail.com",
  //  username: "agence-1ris@gmx.com",
  //  password: "0574B69AD36120C562199C3F90360F5A5C59",
  //  secure: true,
  //};
  
  //Envoyer le mail
  Email.send({
    SecureToken : "b025c27b-85dd-43f3-b839-1f4c9f2a4f2b",
    To : `agence-1ris@gmx.com`,
    From : `${contactForm["email"].value}`,
    Subject : "Test mails contacts",
    Body : `${contactForm["description"].value}`

  }).then((message) => {

    alert(message)
  })

  //Email.send({
  //  Host : "smtp.elasticemail.com",
  //  Username : "agence-1ris@gmx.com",
  //  Password : "0574B69AD36120C562199C3F90360F5A5C59",
  //  To : 'agence-1ris@gmx.com',
  //  From : `agence-1ris@gmx.com`,
  //  Subject : "This is the subject",
  //  Body : `${contactForm["description"].value}`
  //}).then(
  //  message => alert(message)
  //);
  
})

//agence-1ris@gmx.com
//0574B69AD36120C562199C3F90360F5A5C59
//smtp.elasticemail.com 2525