var limparTudo = false;
var specialValues = ['+', 'x', '-', '/'];
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
var validarVirgula = true;
var resultadoTotal = '';
var expressaoContinua = false;
var blackTheme = true;

function DigitarNumero(value){

    if (limparTudo){
        LimparTudo(value);
    }

    if(ValidarRequest(value)){
        document.getElementById("calculo").value += value;
    } else {
        return;
    }    
}

function DigitarOperacao(value){
    var calculo = document.getElementById("calculo").value;

    if(calculo === "" && value != "-") return;

    if(PossuiOperacao(calculo.substring(calculo.length - 1))) return;

    if(PossuiVirgula(calculo.substring(calculo.length - 1))) return;

    if(resultadoTotal != ''){
        limparTudo = false;
    }

    document.getElementById("calculo").value += value;

    validarVirgula = false;
}

function LimparTudo(value){

    if (value != ',')
        document.getElementById("calculo").value = '';
        
    limparTudo = false;
}

function Resultado(){
    var expressao = TrocarCaracteres();

    var result = eval(expressao).toString();

    if(result.length > 11)
        result = result.substring(0, 11);

    if(ValidarResultado(result))
        document.getElementById("calculo").value = result.replaceAll('.', ',');
    else
        document.getElementById("calculo").value = '0';

    resultadoTotal = result;
    limparTudo = true;
}

function LimparDigito(){
    var tamanho = document.getElementById("calculo").value.length;
    var digitos = document.getElementById("calculo").value;

    document.getElementById("calculo").value = digitos.substring(0, tamanho - 1);
}

function TrocarCaracteres(){
    var expressao = document.getElementById("calculo").value;

    expressao = expressao.replaceAll(',', '.').replaceAll('x', '*');

    return expressao;
}

function ValidarRequest(value){
    var calculo = document.getElementById("calculo").value;
    
    if(calculo.length == 11) return false;
 
    if(PossuiOperacao(calculo.substring(calculo.length - 1)) && value === ",") return false;

    if(PossuiOperacao(calculo.substring(calculo.length - 2, calculo.length - 1)) && calculo.substring(calculo.length - 1) === "0" && value === "0") return false;

    if(PossuiVirgula(calculo) && validarVirgula && value === ",") return false;
    
    if(calculo === "0" && value != ","){
        document.getElementById("calculo").value = "";
    }

    var valorCompleto = calculo += value;
    if(valorCompleto === ",") return false;

    if(value == ",") validarVirgula = true;

    return true;
}

function PossuiOperacao(value){
    if(specialValues.includes(value)) return true;
    return false;
}

function PossuiVirgula(value){
    if(value.includes(",")) return true;

    return false;
}

function ValidarResultado(value){
    if(isNaN(parseFloat(value)) || !isFinite(value)) return false;

    return true;
}

function TrocarTema(){
    var body = document.querySelector('body');
    var emoji = document.querySelector('.trocarTema')
    var modoBlack = document.querySelectorAll('.modoBlack');
    var modoBlackOrange = document.querySelectorAll('.modoBlackOrange');
    var modoWhite = document.querySelectorAll('.modoWhite');
    var modoWhiteOrange = document.querySelectorAll('.modoWhiteOrange');
    var baseCalculadoraBlack = document.querySelector('.baseCalculadoraBlack');
    var baseCalculadoraWhite = document.querySelector('.baseCalculadoraWhite');

    if(blackTheme){
        modoBlack.forEach((data) => {
            data.className = "modoWhite";
        })

        modoBlackOrange.forEach((data) => {
            data.className = "modoWhiteOrange";
        })
       
        baseCalculadoraBlack.className = "baseCalculadoraWhite";
        body.style.backgroundColor = "white";

        blackTheme = false;
        emoji.innerHTML = "🌖"

    } else {
        modoWhite.forEach((data) => {
            data.className = "modoBlack";
        })

        modoWhiteOrange.forEach((data) => {
            data.className = "modoBlackOrange";
        })
       
        baseCalculadoraWhite.className = "baseCalculadoraBlack";
        body.style.backgroundColor = "rgb(168, 168, 168)";
        
        blackTheme = true;
        emoji.innerHTML = "🌒"
    }
}