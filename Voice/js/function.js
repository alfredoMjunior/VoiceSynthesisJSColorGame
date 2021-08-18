var engine = {
    "cores": ['verde', 'roxo', 'rosa', 'vermelho', 'amarelo', 'laranja', 'cinza', 'preto'],
    "hexadecimais": {
        'verde': '#02EF00',
        'roxo': '#790093',
        'rosa': '#F02A7E',
        'vermelho': '#E90808',
        'amarelo': '#E7D703',
        'laranja': '#F16529',
        'cinza': '#EBEBEB',
        'preto': '#141414'
    }
}

var nameColor = document.getElementById('colorname')
var content = document.querySelector('.content')
let errou = document.createElement('h4')

function sortear() {
    var corSorteada = Math.floor(Math.random() * (engine.cores.length - 1))
    var nomeDaCor = engine.cores[corSorteada]
    nameColor.innerText = nomeDaCor.toUpperCase()
    return engine.hexadecimais[nomeDaCor]
}


function aplicarCor(cor) {
    var color = document.querySelector('.color')
    color.style.backgroundColor = cor
}

aplicarCor(sortear())

var button = document.querySelector('.button')
var VoiceText = ""
button.addEventListener("click", function (e) {
    gravador.start()
})

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    var gravador = new SpeechAPI()

    gravador.continuos = false
    gravador.lang = "pt-br"

    gravador.onstart = function () {
        button.innerText = "Parar"
        button.style.backgroundColor = "black"
    }

    gravador.onend = function () {
        button.innerText = "Responder"
        button.style.backgroundColor = "crimson"
    }

    gravador.onresult = function (event) {
        VoiceText = event.results[0][0].transcript.toUpperCase()
        console.log(VoiceText)
        if (VoiceText === nameColor.innerText) {
            aplicarCor(sortear())
            errou.innerHTML = ""
        }
        else {

            errou.innerText = "Você errou, tente novamente!"
            content.appendChild(errou)
        }
    }

} else {
    alert('O seu navegador não tem suporte de voz')
}


