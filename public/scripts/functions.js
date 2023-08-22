const newFunctionRow = {
    nameInput: document.getElementById('newFunctionName'),
    typeInput: document.getElementById('newFunctionType'),
    categoryInput: document.getElementById('newFunctionCategory')
}

const newFunctionStandardValues = {
    nameInput: 'NewFunction',
    typeInput: '',
    categoryInput: 'Unspecified'
}

function newFunction() {
    toggleNewFunction(true)
}

function submitNewFunction() {
    postDummy({
        name: newFunctionRow.nameInput.innerText,
        type: newFunctionRow.typeInput.innerText,
        category: newFunctionRow.categoryInput.innerText
    }).then((res) => {
        resetNewFunction()
        location.reload()
    })
}

function toggleNewFunction(state) {
    toggleClass(document.getElementById('newFunctionRow'), state, { onTrue: 'visible', onFalse: 'invisible' })
}

function resetNewFunction() {
    //toggleNewFunction(false)

    newFunctionRow.nameInput.innerText = newFunctionStandardValues.nameInput
    newFunctionRow.typeInput.innerText = newFunctionStandardValues.typeInput
    newFunctionRow.categoryInput.innerText = newFunctionStandardValues.categoryInput
}

async function postDummy(body) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(body)
            resolve({
                status: 200
            })
        }, 1000)
    })
}

function toggleClass(elem, state, {onTrue, onFalse}) {
    if(state) {
        elem.classList.remove(onFalse)
        elem.classList.add(onTrue)
        return
    }

    elem.classList.add(onFalse)
    elem.classList.remove(onTrue)
}

/**
 * Makes element with id either visible or invisible if any is selected or not
 * @param id string
 */
function showIfChecked(id) {
    // Wait until HTML element got attribute 'checked'
    window.setTimeout(() => {
        let anySelected = getSelected().length > 0

        toggleClass(document.getElementById(id), anySelected, {onTrue: 'visible', onFalse: 'invisible'})
    }, 50)
}

/**
 * Checks all bx-checkboxes in rows with class selectableRow
 * @param {*} event 
 */
function checkAllCheckboxes(event) {

    let deselect = event.target.getAttribute('checked') == '' ? true : false

    let functionRows = document.getElementsByClassName('selectableRow')

    for(let fn of functionRows) {
        let checkboxes = fn.getElementsByTagName('bx-checkbox')
        if(checkboxes.length == 0) continue

        let checkbox = checkboxes[0]

        if(deselect == true) {
            checkbox.removeAttribute('checked')
        } else {
            checkbox.setAttribute('checked', '')
        }
    }

}

function getSelected() {

    let selected = []
    let functionRows = document.getElementsByClassName('selectableRow')

    for(let fn of functionRows) {
        let checkboxes = fn.getElementsByTagName('bx-checkbox')
        if(checkboxes.length == 0) continue

        let checkbox = checkboxes[0]

       if(checkbox.getAttribute('checked') == '') selected.push(checkbox.getAttribute('name'))
    }

    return selected
}