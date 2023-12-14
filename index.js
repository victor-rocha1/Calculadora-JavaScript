const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")

//Teclas que podem ser mostradas no visor
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]


//Funções dos botões
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener("click", function () {
      const value = charKeyBtn.dataset.value
      input.value += value
    })
})

document.getElementById("clear").addEventListener("click", function () {
    input.value = ""
    input.focus()
})


//Lógica para permitir aparecer no input apenas as teclas certas
input.addEventListener("keydown", function (ev) {  
    ev.preventDefault()                     //Prevenir o comportamento padrão
    if (allowedKeys.includes(ev.key)) {     //Verifica se inclui a tecla associada ao evento
      input.value += ev.key                 //Se estiver inclusa, acrescenta o valor no input
      return
    }
    if (ev.key === "Backspace") {           //Se for a tecla de backspace  
      input.value = input.value.slice(0, -1) //Apaga o último caractere
    }
    if (ev.key === "Enter") {                
      calculate()                            //O resultado será mostrado
    }
})


//Função Calcular
document.getElementById("equal").addEventListener("click", calculate)

function calculate() {
  resultInput.value = "ERROR" 
  resultInput.classList.add("error")
  const result = eval(input.value)          //Pega o que está no input e calcula
  resultInput.value = result
  resultInput.classList.remove("error")
}

document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
  const button = ev.currentTarget
  if (button.innerText === "Copy") {
    button.innerText = "Copied!"
    button.classList.add("success")
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = "Copy"
    button.classList.remove("success")
  }
})



//Alternar entre tema claro e escuro
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#0c69b0")
    main.dataset.theme = "light"
  } else {
    root.style.setProperty("--bg-color", "#212529")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#21c7fe")
    main.dataset.theme = "dark"
  }
})

