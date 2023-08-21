function checkAnySelected() {
    // Wait until HTML element got attribute 'checked'
    window.setTimeout(() => {
        let anySelected = getSelectedFunctions().length > 0
        console.log(anySelected, getSelectedFunctions())

        if(anySelected) {
            document.getElementById('toolbar').classList.remove('invisible')
            document.getElementById('toolbar').classList.add('visible')
        } else {
            document.getElementById('toolbar').classList.remove('visible')
            document.getElementById('toolbar').classList.add('invisible')
        }
    }, 50)
}

function selectAll(event) {

    let deselect = event.target.getAttribute('checked') == '' ? true : false

    let functionRows = document.getElementsByClassName('function')

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

function getSelectedFunctions() {

    let selected = []
    let functionRows = document.getElementsByClassName('function')

    for(let fn of functionRows) {
        let checkboxes = fn.getElementsByTagName('bx-checkbox')
        if(checkboxes.length == 0) continue

        let checkbox = checkboxes[0]

       if(checkbox.getAttribute('checked') == '') selected.push(checkbox.getAttribute('name'))
    }

    return selected
}