var endpoint_pokemon = window.location.origin + "/api/pokemon";
var tela_detalhe = document.getElementById("conteudo");
var resultados = document.getElementById("resultados");
var data_json;
function carregar_pokemon() {
  let ajax = new XMLHttpRequest();

  ajax.open("GET", endpoint_pokemon, true);
  ajax.send();

  //Lendo requisição
  ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data_json = JSON.parse(this.responseText);

      if (data_json.length > 0) {
        resultados.className = "row";
        imprimir_pokemon();
      }
    }
  };
}

carregar_pokemon();

var files_img_pokemons = [];

function imprimir_pokemon() {
  let html_conteudo = "";

  for (let i = 1; i < data_json.length; i++) {
    html_conteudo += card_pokemon(
      i,
      data_json[i].name,
      data_json[i].type,
      data_json[i].imageurl
    );
  }

  resultados.innerHTML += html_conteudo;
}

let btVoltar = document.getElementById("btVoltar");

btVoltar.addEventListener("click", function () {
  let color = tela_detalhe.className.substring(
    tela_detalhe.className.indexOf("color_")
  );
  tela_detalhe.className = "animate__animated animate__bounceOutLeft " + color;

  setTimeout(function () {
    document.getElementById("conteudo_img").style.display = "none";
  }, 500);
});

function btCard(id) {
  tela_detalhe.style.display = "block";

  document.getElementById("conteudo_img").style.display = "block";
  tela_detalhe.className =
    "animate__animated animate__bounceInLeft color_" + data_json[id].type;
  document
    .getElementById("conteudo_img")
    .setAttribute("src", data_json[id].imageurl);
  document.getElementById("conteudo_nome").innerHTML = data_json[id].name;
  document.getElementById("conteudo_numero").innerHTML =
    "#" + padLeadingZeros(data_json[id].id, 3);
  document.getElementById("conteudo_tipo").innerHTML = data_json[id].type;
  document.getElementById("conteudo_descricao").innerHTML =
    data_json[id].description;
  document.getElementById("conteudo_ataque").innerHTML = data_json[id].attack;
  document.getElementById("conteudo_defesa").innerHTML = data_json[id].defense;
  document.getElementById("conteudo_altura").innerHTML = data_json[id].height;
}

function card_pokemon(id, nome, tipo, img) {
  return (
    '<div class="col-6 col-md-3" onClick="javascript:btCard(\'' +
    id +
    '\');" data-id="' +
    id +
    '">' +
    '<div class="card_pokemon color_' +
    tipo +
    '">' +
    '<div class="info_pokemon">' +
    "<h3>" +
    nome +
    "</h3>" +
    '<span class="badge rounded-pill bg-alert-poke">' +
    tipo +
    "</span>" +
    "</div>" +
    '<img src="' +
    img +
    '" class="img_pokemon">' +
    "</div>" +
    "</div>"
  );
}

function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
