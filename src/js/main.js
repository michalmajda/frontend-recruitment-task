const mainBtn = document.querySelector('.btn1')
const info = document.querySelector('.info')
const modal = document.querySelector('.modal-shadow')
const close = document.querySelector('.fa-x')
const modalTable = document.querySelector('.modal')
const clearBtn = document.querySelector('.btn2')
const loader = document.querySelector('.loader')
const tablePlace = document.querySelector(".tableplace")
const tableHeaders = ["Name and surname", "Email", "Adress", "Phone number", "Company name"]

const showLoader = () => {
    loader.style.display = "block"
}

const closeLoader = () => {
    loader.style.display = "none"
}

const createTable = () => {
    while (tablePlace.firstChild){ 
        tablePlace.removeChild(tablePlace.firstChild)
     } 

    let table = document.createElement('table') 
    table.className = 'table'
    let tableHead = document.createElement('thead') 
    let tableHeaderRow = document.createElement('tr') 
    tableHeaderRow.className = 'tableHeaderRow'
    
    tableHeaders.forEach(header => {
        let tableHeader = document.createElement('th') 
        tableHeader.innerText = header
        tableHeaderRow.append(tableHeader) 
})
    tableHead.append(tableHeaderRow) 
    table.append(tableHead)
    let tableBody = document.createElement('tbody') 
    table.append(tableBody) 
    tablePlace.append(table) 
}

const addElement = (element) => {
    const createdTable = document.querySelector('.table') 
    let tableBodyRow = document.createElement('tr') 
    let nameAndSurname = document.createElement('td')
    nameAndSurname.innerText = element.name
    let email = document.createElement('td')
    email.innerText = element.email
    let adress = document.createElement('td')
    adress.innerText = `${element.address.city}, ${element.address.street}, ${element.address.suite}`
    let phone = document.createElement('td')
    phone.innerText = element.phone
    let company = document.createElement('td')
    company.innerText = element.company.name
    tableBodyRow.append(nameAndSurname, email, adress, phone, company) 
    createdTable.append(tableBodyRow) 

}

const getInfos = () => {
    fetch('https://jsonplaceholder.typicode.com/users') 
    .then(res => res.json())
    .then(showLoader())
    .then(data => {
    createTable() 
    for (const element of data) {
        addElement(element) 
    }
    closeLoader()
    })
    .catch(err => console.log(err))
    }


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
    getInfos()
} 

const closePopup = e => {
    if(modal.style.display == "block"){
        if(e.target == modal || e.target == close){
            modal.style.display = "none"
        }
}
}

mainBtn.addEventListener('click', countAndOpenPopup)
window.addEventListener('click', closePopup)
clearBtn.addEventListener('click', clearCounter)



