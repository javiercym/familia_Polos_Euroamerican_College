const url = 'https://espartano.azurewebsites.net/reporteFamilia';
// const url = 'https://localhost:7147/reporteFamilia'
let rellenar = document.querySelector("#rellenar"); 
var cantidadAsistentesAlumnos;
var cantidadAsistentesTrabajadores;
var cantidadPolos;
obtenerDatos();

if (localStorage.getItem("usuario") ==null) {
  window.location="/index.html";
}

async function obtenerDatos(){

    await fetch(url)
        .then(response => response.json())
        .then(json=>{imprimir(json.data),
          cantidadAsistentesAlumnos=(json.totalAlumnosAsistentes)
        });
    document.getElementById("totalFamilia").innerHTML= cantidadAsistentesAlumnos;

}
let imprimir = (array)=>{
    var cantAmarillo,cantAzul,cantRojo,cantVerde;

    array.forEach(reporte => {
        rellenar.innerHTML+=` 
        <div class="col-6 dato">Cantidad total ${reporte.color}: <span id="${reporte.color}">${reporte.cantidad}</span> </div>
        `
        if (reporte.color == "Amarillo") {
          cantAmarillo = reporte.cantidad;
        }else if (reporte.color == "Azul") {
            cantAzul = reporte.cantidad;
        }else if (reporte.color == "Rojo") {
            cantRojo = reporte.cantidad;
        }else if (reporte.color == "Verde") {
            cantVerde = reporte.cantidad;
        }

    });
    grafico(cantAmarillo,cantAzul,cantRojo,cantVerde);
}

function grafico(cantAmarillo, cantAzul, cantRojo, cantVerde) {
    const ctx = document.getElementById('myChart');
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Amarillo', 'Azul', 'Rojo', 'Verde'],
        datasets: [{
          label: 'Cantidad de colores',
          data: [cantAmarillo, cantAzul, cantRojo, cantVerde],
          backgroundColor: [
            '#ffff00',
            '#0000ff',
            '#ff0000',
            '#008000',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false, // Oculta la leyenda (incluido el bloque de color en el lado izquierdo)
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1 // Establece el valor de incremento deseado en el eje y
              }
          }
        }
      }
    });
  }

