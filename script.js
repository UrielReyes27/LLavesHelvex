document.addEventListener("DOMContentLoaded", function () {
    const escenaEl = document.querySelector("a-scene");
 
  
    let arSystem;
    const exampleTarget = document.querySelector("#example-target");
    escenaEl.addEventListener("loaded", function () {
      arSystem = escenaEl.systems["mindar-image-system"];
      exampleTarget.addEventListener("targetFound", (event) => {
        console.log("Target found");
  
        arSystem.pause(true);
      });
  

      exampleTarget.addEventListener("targetLost", (event) => {
        console.log("Target lost");
        arSystem.pause(false);
      });
  
     
    });
  });


  const imagen1 = document.querySelector("#uno");
  const imagen2 = document.querySelector("#dos");
  const imagen3 = document.querySelector("#tres");
  const llave1 = document.querySelector("#llave1");
  const llave2 = document.querySelector("#llave2");
  const llave3 = document.querySelector("#llave3");

  imagen1.addEventListener('click', function () {
    llave1.setAttribute("visible", "true");
    llave2.setAttribute("visible", "false");
    llave3.setAttribute("visible", "false");
  });

  imagen2.addEventListener('click', function (){
    llave1.setAttribute("visible", "false");
    llave2.setAttribute("visible", "true");
    llave3.setAttribute("visible", "false");
  });

  imagen3.addEventListener('click', function(){
    llave1.setAttribute("visible", "false");
    llave2.setAttribute("visible", "false");
    llave3.setAttribute("visible", "true")
  });



