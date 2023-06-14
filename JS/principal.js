const url = 'https://espartano.azurewebsites.net/familia';
// const url = 'https://localhost:7147/familia';
let rellenar = document.querySelector("#rellenar"); 
var input = document.getElementById("nombreAlumno");

if (localStorage.getItem("usuario") ==null) {
    window.location="/familia_Polos_Euroamerican_College";
}

function cerrarSesion(){
    localStorage.clear();
    window.location="/familia_Polos_Euroamerican_College";
}

function BuscarAlumno(){
    nombreAlumno=document.getElementById("nombreAlumno").value;
    if(nombreAlumno==""){ return alert("Colocar el Nombre o Apellido del alumno" )}
    obtenerDatos(nombreAlumno);
}

async function obtenerDatos(nombreAlumno){
    await fetch(url+"/"+nombreAlumno)
        .then(response => response.json())
        .then(json=>{imprimir(json.data)
        });
}
let imprimir = (array)=>{
    var informacionAlumno ="";

    array.forEach((alumno) => {
        informacionAlumno+=
        ` 
        <div class="row margen">
            <div class="form-check col-10">
                <input class="form-check-input valores" type="checkbox" value="${alumno.codFamilia}" id="${alumno.codFamilia}"
                ${alumno.haAsistido === true ? "checked":" " } >
                <label class="form-check-label" for="${alumno.codFamilia}">${alumno.familia}</label>
            </div>
        <div class="${alumno.color} col-1"></div>
        </div>
        `  
    });
    rellenar.innerHTML= informacionAlumno
    checkGuardar()
}

function checkGuardar(){
    const checkboxes = document.querySelectorAll('.valores');

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const value = this.value;
            const labelText = this.nextElementSibling.textContent;
            const colorClass = this.parentNode.nextElementSibling.classList[0];
            const isChecked = this.checked;

            // alert(`Código: ${value}, Nombre: ${labelText}, Color: ${colorClass}, Checked: ${isChecked}`);
            guardar(value,isChecked);
        });
    });
}

function guardar(value, isChecked) {
    var urlPos = url + "/" + value;
    var body = {
      haAsistido: isChecked
    };
  
    fetch(urlPos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {
        alert(json.mensaje);
      });
  }
  
