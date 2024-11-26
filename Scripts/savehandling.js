// js file storing save functions

export function gameSave(data) {
    console.log(data)
    let save = JSON.stringify(data);
    console.log(save)
    localStorage.setItem('saveData', save)
}

export function gameLoad() {
    if (JSON.parse(localStorage.getItem('saveData')) === null) {
        return;
    } else {
        return JSON.parse(localStorage.getItem('saveData'))
    }
}

