
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  
  event.preventDefault();
  
  let config = {
    from_name: `${contactForm["nom"].value} ${contactForm["prenom"].value}`,
    message: contactForm["description"].value,
    reply_to: contactForm["email"].value
  }

  emailjs.send("service_9y0odtt", "template_7znbnds", config)
  .then(() => {

    //alert("C'est passé");
    
  })
  .catch((error) => {

    console.log(error.code);
    console.log(error.message);

  })

})