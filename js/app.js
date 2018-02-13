var min;
var seg;
var Temporizar;
var Verificar = false;

    function CambioColor(elemento){
      var color = $(elemento).css("color");
      if (color=="rgb(231, 108, 26)") {
        $(elemento).css("color","blue");
      }
      else {
        $(elemento).css("color","red");
      }
      setTimeout(CambioColor(".main-titulo"),1000) ;
    }

function CaidaDulces(){  
  for (var i = 1; i <8; i++) {
      for (var j = 1; j < 8; j++) {
        var ClaseDulce= Math.floor((Math.random() * 4) + 1);
        var fila = "<div class='row-"+j+"'></div>";
        var ElementImg=document.createElement('img')
        $(".col-"+i).append(ElementImg)
        $(ElementImg).addClass('elemento')
        $(ElementImg).attr('src',"image/"+ClaseDulce+".png")        
      }
  }
      AgregaDulceEvents();
      JugadaVertical();
      JugadaHorizontal();
}

    function AgregaDulceEvents() {
        $('img').draggable({
        containment: '.panel-tablero',
        droppable: 'img',
        revert: true,
        revertDuration: 500,
        grid: [100, 100],
        zIndex: 10,
        drag: ConstrainCandyMove
        });
        $('img').droppable({
          drop: MueveDulce
        });
       JugadaVertical();
       JugadaHorizontal();
    }

function MueveDulce(event, candyDrag){
  var candyDrag = $(candyDrag.draggable);
  var dragSrc = candyDrag.attr('src');
  var candyDrop = $(this);
  var dropSrc = candyDrop.attr('src');
  candyDrag.attr('src', dropSrc);
  candyDrop.attr('src', dragSrc);

  setTimeout(function () {
        JugadaVertical();
        JugadaHorizontal();
        ActualizaMovimientos();
    }, 500);
}

    function ActualizaMovimientos(){
      var actualValue = Number($('#movimientos-text').text());
      var result = actualValue += 1;
      $('#movimientos-text').text(result);
    }

function ActualizaPuntuacion(eliminados){
  var PuntosActuales = Number($('#score-text').text());
  var PuntosNuevos = PuntosActuales += eliminados;
  $('#score-text').text(PuntosNuevos);
}

    function ConstrainCandyMove(event, candyDrag) {
      candyDrag.position.top = Math.min(100, candyDrag.position.top);
      candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
      candyDrag.position.left = Math.min(100, candyDrag.position.left);
      candyDrag.position.right = Math.min(100, candyDrag.position.right);
    }

function JugadaVertical(){
  var eliminados = 0
  for (var x = 1; x <8; x++) {
      var OpcionesVerticales=0;
      var DulceAnterior="";
      var EliminarImagenes = new Array();
      for (var y = 0; y < 7; y++) {
        var dulce= $(".col-"+x).children('img')[y].src;
          if (dulce==DulceAnterior ) {
            OpcionesVerticales+=1;
              if (OpcionesVerticales==1) {
                EliminarImagenes[1]=$(".col-"+x).children('img')[y-1];
              }
              EliminarImagenes[OpcionesVerticales+1]=$(".col-"+x).children('img')[y];
          }
          else if (dulce!=DulceAnterior && OpcionesVerticales<2){
              OpcionesVerticales=0;
              EliminarImagenes = new Array();
          }
          var DulceAnterior = dulce;
      }

      /*Borrado para los dulces*/
      if (OpcionesVerticales>=2){
        for (var i = 1; i <= OpcionesVerticales+1; i++) {          
          EliminarImagenes[i].remove();
          eliminados += 1;
        };
        ActualizaPuntuacion(EliminarImagenes.length);
      };      
  }
    if (eliminados>1) {
      EspaciosVacios();
    };
}

    function JugadaHorizontal(){
      var eliminadosX = 0
      for (var x = 1; x < 8; x++) {
        var OpcionesHorizontales=0;
        var DulceAnteriorX="";
        var EliminarImagenesX = new Array();
        var z=0
        for (var y = 0; y < 7; y++) {
          z+=1
          var dulceX = $(".col-"+z).children('img')[x-1].src;
          if (dulceX==DulceAnteriorX) {
            OpcionesHorizontales+=1;
            if (OpcionesHorizontales==1) {
              var anterior = z-1
              EliminarImagenesX[1]=$(".col-"+anterior).children('img')[x-1];
            }
            EliminarImagenesX[OpcionesHorizontales+1]=$(".col-"+z).children('img')[x-1]

          } else if (dulceX!=DulceAnteriorX && OpcionesHorizontales<2){
            OpcionesHorizontales=0;
            EliminarImagenesX = new Array();
          };
         var DulceAnteriorX = dulceX;
        };
        if (OpcionesHorizontales>=2){
          /*Borrado de los dulces*/
          for (var h = 1; h <= OpcionesHorizontales+1; h++) {
            EliminarImagenesX[h].remove();
            eliminadosX += 1;
          }
          ActualizaPuntuacion(EliminarImagenesX.length);
        }; 
        if (eliminadosX>1) {EspaciosVacios();};
      };
      
    }

function EspaciosVacios(){
  for (var i = 1; i < 8; i++) {
    var hijos = 7- $(".col-"+i).children('img').length;
    for (var j = 0; j < hijos; j++) {
      var ClaseDulce= Math.floor((Math.random() * 4) + 1);
      var ElementImg=document.createElement('img')
      $(".col-"+i).prepend(ElementImg)
      $(ElementImg).addClass('elemento')
      $(ElementImg).attr('src',"image/"+ClaseDulce+".png")
    };
  };
  
  AgregaDulceEvents();
}

function ReiniciarJuego(Verificar) {
  clearTimeout(Temporizar);
  $(".btn-reinicio").text("Iniciar");
  if (Verificar) {
    $(".panel-tablero").show("slow");
    $(".panel-score").animate(
      {
        width: "-=50"
      }, 1000
    );
    Verificar=false;
  };
  
}


function FinalizarJuego() {
  clearTimeout(Temporizar);
  $(".panel-tablero").hide("slow");
  $(".panel-score").animate(
    {
      width: "+=50"
    }, 1000
  );
  Verificar=true;
}

$(".btn-reinicio").on("click", function(){
  var nombre =$(".btn-reinicio").text();
  if (nombre=="Iniciar") {
    $(".btn-reinicio").text("Reiniciar");
    clearTimeout(Temporizar);
  }
  else {
    ReiniciarJuego(Verificar);
  }
  min =0;
  seg =0;
  $(".elemento").remove('img');
  $('#score-text').text("0");
  $('#movimientos-text').text("0");
  updateReloj();
  CaidaDulces();
});

