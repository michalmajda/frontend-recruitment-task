const mainBtn = document.querySelector('.btn1')
const info = document.querySelector('.info')
const modal = document.querySelector('.modal-shadow')
const close = document.querySelector('.fa-x')
const modalTable = document.querySelector('.modal')
const clearBtn = document.querySelector('.btn2')


const clearCounter = () => {
    sessionStorage.currentResult = 0
    modal.style.display = "none"
}

const addClearButton = () => {
    if(sessionStorage.currentResult >= 5) {
        if(clearBtn.style.display != "block"){
        clearBtn.style.display = "block"
        }
    }
    else{
        clearBtn.style.display = "none" 
    }
}

const countAndOpenPopup = () => {
    if(typeof(Storage) !== undefined){
        if(sessionStorage.currentResult){
            sessionStorage.currentResult = Number(sessionStorage.currentResult) + 1;
        }
        else {
            sessionStorage.currentResult = 1
        }
    }

    addClearButton()

    info.textContent = `You have clicked ${sessionStorage.currentResult} times to related button.`
    modal.style.display = "block"
} 



const closePopup = e => {
    if(modal.style.display == "block"){
        if(e.target == modal || e.target == close){
            modal.style.display = "none"
        }
}
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data));



mainBtn.addEventListener('click', countAndOpenPopup)
window.addEventListener('click', closePopup)
clearBtn.addEventListener('click', clearCounter)



