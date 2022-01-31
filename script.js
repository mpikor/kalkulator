const numbers = document.querySelectorAll ('.number')
const operators = document.querySelectorAll ('.operator')
const wyczysc = document.querySelector ('.clear')
const usun = document.querySelector ('.delete')
const rownosc = document.querySelector ('.equality')
const poprzednieWynik = document.querySelector ('.previous')
const aktualneWynik = document.querySelector ('.current')


var current = ''
var previous = ''
var operation = undefined


const oblicz = () => {
    let dzialanie 
    if (!previous || !current){
        return
    }

    const poprzednie = parseFloat(previous)
    const aktualne = parseFloat(current)

    if(isNaN(poprzednie) || isNaN(aktualne)) {
        return
    }

    switch (operation) {
        case '+':
            dzialanie = poprzednie + aktualne
            break;
        case '-':
            dzialanie = poprzednie - aktualne
            break;
        case '×':
            dzialanie = poprzednie * aktualne
            break;
        case '÷':
            dzialanie = poprzednie / aktualne
            break;
        case '√':
            dzialanie = Math.pow(poprzednie, 1/aktualne)
            break;
        case '%':
            dzialanie = poprzednie / 100 * aktualne
            break;
        case '^':
            dzialanie = Math.pow(poprzednie, aktualne)
            break;
        case 'log':
            dzialanie = Math.log(poprzednie) / Math.log(aktualne)
            break;
        default:
            return
    }

    current = dzialanie
    operation = undefined
    previous = ''

}



const selectOperations = (operator) => {
    if(aktualneWynik === '') {
        return
    }
    if (previous !== '') {
        oblicz()
    }
    operation = operator
    previous = current
    current = ''
}

const updateResult = () => {
    aktualneWynik.innerText = current
    if(operation != null) {
        poprzednieWynik.innerText = previous + operation
    } else {
        poprzednieWynik.innerText = ''
    }
}


const addNumber = (number) => {
    if(number === '•') {
        if(current.includes('.')) {
            return
        }
        number = '.'
    }
    current = current.toString() + number.toString()
}


const deleteNumber = () => {
    current = current.toString().slice(0, -1)
}


numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
});


usun.addEventListener('click', () => {
    deleteNumber()
    updateResult()
})

operators.forEach ((operator) => {
    operator.addEventListener('click', () => {
        selectOperations(operator.innerText)
        updateResult()
    })
})


rownosc.addEventListener('click', () => {
    oblicz()
    updateResult()
})