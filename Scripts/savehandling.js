// js file storing save functions

export function gameSave(data) {
    console.log(data)
    let save = JSON.stringify(data);
    console.log(save)
    localStorage.setItem('saveData', save)
}

export function gameLoad() {
    if (JSON.parse(localStorage.getItem('saveData')) === null) {
        return {
            instanceData: {
                amount: 0,
                gain: 0
            },
            momentData: {
                amount: 0,
                gain: 1,
                cost: 0,
                multiplier: 0,
            },
            lustrumData: {
                amount: 0,
                gain: 1,
                cost: 0,
                exponent: 0
            },
            kalpaData: {
                amount: 0,
                gain: 1,
                cost: 0
            },
            dilationData: {
                level: 0,
                cost: 0,
                multiplier: 0,
                max: 140
            },
            fractureData: {
                level: 0,
                cost: 0,
                chance: 0,       
                max: 1000
            },
            rendData: {
                level: 0,
                cost: 0,
                multiplier: 0,
                max: 4
            },
            tickspeedData: {
                speed: 1000,
            }
        };
    } else {
        return JSON.parse(localStorage.getItem('saveData'))
    }
}

