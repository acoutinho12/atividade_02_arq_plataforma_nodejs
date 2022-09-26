/*
#
# Globais
#
*/
var quant_pokemon = 10;
var contar = 1;
var endpoint_pokemon = "https://pokedex-bb36f.firebaseio.com/pokemon.json";
var tela_detalhe = document.getElementById("conteudo");
var resultados = document.getElementById("resultados");
var data_json;
var CACHE_DINAMICO = "pokedex_dinamico";
/*
#
# Requisição AJAX
#
*/
function carregar_pokemon(){
    
    let ajax = new XMLHttpRequest();

    ajax.open("GET", endpoint_pokemon, true);
    ajax.send();
    
    //Lendo requisição
    ajax.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200)
        {
            data_json = JSON.parse(this.responseText);

            if(data_json.length > 0){
                cache_dinamico_json();
                resultados.className = "row";
                //Carga inicial
                imprimir_pokemon();
            }
        }

    }
}

carregar_pokemon();

var files_img_pokemons = [];

function imprimir_pokemon(){

    let html_conteudo = "";
    let limite;
    if((contar+quant_pokemon) < data_json.length){
        limite = (contar+quant_pokemon);
    }else{
        limite = data_json.length;
        btCarregarMais.style.display = "none";
    }

    for(let i=contar; i < limite; i++){
        //Montar Card
        html_conteudo+=card_pokemon(i,data_json[i].name,data_json[i].type,data_json[i].imageUrl);  

    }

    resultados.innerHTML += html_conteudo;

    contar+=quant_pokemon;

}

/*
#
# Comportamento Botões
#
*/

let btVoltar = document.getElementById("btVoltar");

btVoltar.addEventListener("click", function(){
    let color = tela_detalhe.className.substring(tela_detalhe.className.indexOf("color_"));
    tela_detalhe.className = "animate__animated animate__bounceOutLeft "+color;
    
    setTimeout(function(){document.getElementById("conteudo_img").style.display = "none";}, 500);
});

let btCarregarMais = document.getElementById("btCarregarMais");

btCarregarMais.addEventListener("click", function(){
    imprimir_pokemon();
});

function btCard(id){
    tela_detalhe.style.display = "block";

    document.getElementById("conteudo_img").style.display = "block";
    tela_detalhe.className = "animate__animated animate__bounceInLeft color_"+data_json[id].type;   
    document.getElementById("conteudo_img").setAttribute("src",data_json[id].imageUrl);
    document.getElementById("conteudo_nome").innerHTML = data_json[id].name;
    document.getElementById("conteudo_numero").innerHTML = "#"+padLeadingZeros(data_json[id].id, 3);;
    document.getElementById("conteudo_tipo").innerHTML = data_json[id].type;
    document.getElementById("conteudo_descricao").innerHTML = data_json[id].description;
    document.getElementById("conteudo_ataque").innerHTML = data_json[id].attack;
    document.getElementById("conteudo_defesa").innerHTML = data_json[id].defense;
    document.getElementById("conteudo_altura").innerHTML = data_json[id].height;
}


/*
#
# Sistema de Template
#
*/

function card_pokemon(id,nome,tipo,img){

    return '<div class="col-6 col-md-3" onClick="javascript:btCard(\''+id+'\');" data-id="'+id+'">'+
                '<div class="card_pokemon color_'+tipo+'">'+
                '<div class="info_pokemon">'+
                    '<h3>'+nome+'</h3>'+
                    '<span class="badge rounded-pill bg-alert-poke">'+tipo+'</span>'+
                '</div>'+
                '<img src="'+img+'" class="img_pokemon">'+
                '</div>'+
            '</div>';
}

/*
#
# Cache Dinâmico (json / imgs)
#
*/
var cache_dinamico_json = function(){

    localStorage[CACHE_DINAMICO] = JSON.stringify(data_json);
}

/*
#
# Botao de Instalação
#
*/

let janelaInstalacao = null;

const btInstall = document.getElementById("btInstall");

window.addEventListener('beforeinstallprompt', gravarJanela);

function gravarJanela(evt){
    janelaInstalacao = evt;
}

let inicializarInstalacao = function(){

    btInstall.removeAttribute("hidden");
    btInstall.addEventListener("click", function(){

        janelaInstalacao.prompt();

        janelaInstalacao.userChoice.then((choice) => {

            if(choice.outcome === 'accepted'){
                console.log("Usuário fez a instalação do app");
            }else{
                console.log("Usuário NÃO fez a instalação do app");
            }

        });

    });

}

/*
#
# Funções Extras
#
*/
function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}