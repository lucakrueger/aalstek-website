const newFunctionRow = {
    nameInput: document.getElementById('newFunctionName'),
    typeInput: document.getElementById('newFunctionType'),
    categoryInput: document.getElementById('newFunctionCategory'),
    statusOutput: document.getElementById('newFunctionStatus'),
    saveButton: document.getElementById('newFunctionSave')
}

const newFunctionStandardValues = {
    nameInput: 'NewFunction',
    typeInput: '',
    categoryInput: 'Unspecified',
    saveButton: {
        save: 'Save',
        success: 'Saved!',
        failed: 'Failed'
    }
}

function saveFunction(name) {
    postDummy({
        name: name,
        script: window.editor.getValue()
    }).then((res) => {

        let saveButton = document.getElementById(name).getElementsByTagName('bx-btn')[0]

        toggleAttribute(saveButton, 'kind', res.status == 200, {
            onTrue: 'primary',
            onFalse: 'danger'
        })

        toggleKey(saveButton, 'innerText', res.status == 200, {
            onTrue: 'Saved',
            onFalse: 'Failed'
        })

        setTimeout(() => {
            saveButton.setAttribute('kind', 'tertiary')
            saveButton.innerText = 'Save'
        }, 1500)


    })
}

/*
    Edit
    - Make Row Invisible
    - Fill new row with old data
    - Save as new
*/

function newFunction() {
    toggleNewFunction(true)
}

function submitNewFunction() {
    postDummy({
        name: newFunctionRow.nameInput.innerText,
        type: newFunctionRow.typeInput.innerText,
        category: newFunctionRow.categoryInput.innerText
    }).then((res) => {

        newFunctionRow.statusOutput.innerText = res.status

        if(res.status == 200) {
            newFunctionRow.saveButton.setAttribute('kind', 'primary')
            newFunctionRow.saveButton.innerText = newFunctionStandardValues.saveButton.success
            
            setTimeout(() => {
                location.reload()
            }, 500)

            return
        }

        newFunctionRow.saveButton.setAttribute('kind', 'danger')
        newFunctionRow.saveButton.innerText = newFunctionStandardValues.saveButton.failed

        setTimeout(() => {
            newFunctionRow.saveButton.innerText = newFunctionStandardValues.saveButton.save
        }, 2000)

        //resetNewFunction()
        //location.reload()
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
                status: 500
            })
        }, 1000)
    })
}

function toggleKey(elem, key, state, {onTrue, onFalse}) {
    state == true ? elem[key] = onTrue : elem[key] = onFalse
}

function toggleAttribute(elem, attr, state, {onTrue, onFalse}) {
    state == true ? elem.setAttribute(attr, onTrue) : elem.setAttribute(attr, onFalse)
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

function showIfOneSelected(id) {
    let oneSelected = getSelected().length == 1

    toggleClass(document.getElementById(id), oneSelected, {onTrue: 'visible', onFalse: 'invisible'})
}

/**
 * Makes element with id either visible or invisible if any is selected or not
 * @param id string
 */
function showIfChecked(id) {
    // Wait until HTML element got attribute 'checked'
    window.setTimeout(() => {
        let anySelected = getSelected().length > 0

        showIfOneSelected('toolbarEdit')

        toggleClass(document.getElementById(id), anySelected, {onTrue: 'visible', onFalse: 'invisible'})
    }, 100)
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