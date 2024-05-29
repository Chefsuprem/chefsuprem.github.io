
const contactForm = document.getElementById("contactForm");
const toastSucessMail = document.getElementById("toastSucessMail");

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
    const toastOptions = {
      delay: 10000
    }

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastSucessMail, toastOptions);
    toastBootstrap.show()
    
  })
  .catch((error) => {

    console.log(error.code);
    console.log(error.message);

  })

})