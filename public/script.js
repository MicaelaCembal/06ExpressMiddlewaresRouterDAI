function GetById(id) { 
    console.log(id);
    var elemento = document.querySelector("#contenedor");
  elemento.innerHTML = "";
  if (id !="") {
    axios
      .get(`http://localhost:3000/api/pizzas/${id}`)
      .then((result) => {
        const pizzas = result.data;
       
          const { Nombre, LibreGluten, Importe, Descripcion } = pizzas;
          
        
          elemento.innerHTML+= `
            
          <div class="card" style="width: 18rem;">
          <div class="card-body">
                      <h5 class="card-title">${Nombre}</h5>                                
                      <p class="card-text">Libre de Gluten: ${LibreGluten} </p>
                      <p class="card-text">Importe: ${Importe} </p>
                      <p class="card-text">Descripcion: ${Descripcion} </p>
                  </div>
                  
                </div> 
            `;
        })
  }
  else{
    elemento.innerHTML+= `
    <div class="pb-3" >  </div>
    <h4>Intentelo nuevamente</h4>  
    <div class="pb-3" >  </div>`;
  }
  
  }


  function Delete(id) { 
    console.log(id);
    var elemento = document.querySelector("#contenedor");
  elemento.innerHTML = "";
  if (id !="") {
    axios
      .delete(`http://localhost:3000/api/pizzas/${id}`)
      .then((result) => {
        const pizzas = result.data;
       
          const { Nombre, LibreGluten, Importe, Descripcion } = pizzas;
          
        
          elemento.innerHTML+= `
            
          <h4> La pizza se ha eliminado correctamente</h4>
            `;
        })
    }
    else{
      elemento.innerHTML+= `
      <div class="pb-3" >  </div>
      <h4>Intentelo nuevamente</h4>  
      <div class="pb-3" >  </div>`;
    }
    
    }

    function GetAll() {
        var elemento = document.querySelector("#contenedorAll");
        elemento.innerHTML = "";
      
        axios
          .get("http://localhost:3000/api/pizzas/")
          .then((result) => {
            if (result.data && Array.isArray(result.data)) {
              const pizzas = result.data;
      
              let tableBody = '';
      
              pizzas.forEach((pizza) => {
                const { Nombre, LibreGluten, Importe, Descripcion } = pizza;
      
                tableBody += `
                  <tr>
                      <td>${Nombre}</td>
                      <td>${LibreGluten}</td>
                      <td>${Importe}</td>
                      <td>${Descripcion}</td>
                  </tr>
                `;
              });
      
              elemento.innerHTML = `
                <table class="table">
                <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Libre Gluten</th>
                    <th scope="col">Importe</th>
                    <th scope="col">Descripción</th>
                </tr>
                </thead>
                <tbody>
                  ${tableBody}
                </tbody>
                </table>
              `;
            } else {
              console.error('La respuesta de la API no contiene los datos esperados');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
    
      function Update() { 
        var elemento = document.querySelector("#contenedorUp");
      elemento.innerHTML = "";
      const url =`http://localhost:3000/api/pizzas/update`;
            const objPizza = {

                    "Id": document.getElementById("idUp").value,
                    "Nombre": document.getElementById("nombreUp").value,
                    "LibreGluten": document.getElementById("libreGlutenUp").value,
                    "Importe": document.getElementById("importeUp").value,
                    "Descripcion": document.getElementById("descUp").value
            }

console.log(objPizza);
console.log(objPizza.nombre)
        axios
          .put(url, objPizza)
          .then(() => {
        
            elemento.innerHTML+= `
              <h4>¡La pizza se ha actualizado correctamente!</h4>
              `;
            })
      return false
        }

 
function Insert() { 
var elemento = document.querySelector("#contenedorIn");
elemento.innerHTML = "";
const url =`http://localhost:3000/api/pizzas/insert`;
    const objPizza = {

            "Id": document.getElementById("idIn").value,
            "Nombre": document.getElementById("nombreIn").value,
            "LibreGluten": document.getElementById("libreGlutenIn").value,
            "Importe": document.getElementById("importeIn").value,
            "Descripcion": document.getElementById("descIn").value
    }

console.log(objPizza);
console.log(objPizza.nombre)
axios
  .post(url, objPizza)
  .then(() => {

    elemento.innerHTML+= `
      <h4>¡La pizza se ha insertado correctamente!</h4>
      `;
    })
return false
}