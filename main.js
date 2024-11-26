/* Main JS Code */
import * as currency from './Scripts/currency.js'
import * as purchase from './Scripts/purchases.js'
import * as save from './Scripts/savehandling.js'

const buttons = {
    dilationButton: {
        src: document.querySelector('.dilation'),
    },
    fractureButton: {
        src: document.querySelector('.fracture'),
    },
    rendButton: {
        src: document.querySelector('.rend'),
    },
    momentButton: {
        src: document.querySelector('.convertinstance'),
    },
    lustrumButton: {
        src: document.querySelector('.convertmoment'),
    },
    kalpaButton: {
        src: document.querySelector('.convertlustrum'),
    },
    saveButton: {
        src: document.querySelector('.savebutton')
    },
    loadButton: {
        src: document.querySelector('.loadbutton')
    }
    
}

let upgrades = {
    conversionUpgrades: {
        momentconversion: () => {
            gameData.momentData.amount += gameData.momentData.gain
            gameData.instanceData.amount -= gameData.momentData.cost      
        },
        lustrumconversion:  () => {
            gameData.lustrumData.amount += gameData.lustrumData.gain
            gameData.momentData.amount -= gameData.lustrumData.cost                     
        },
        kalpaconversion: () => {
            gameData.kalpaData.amount += gameData.kalpaData.gain
            gameData.lustrumData.amount -= gameData.kalpaData.cost
        }
    },
    gainUpgrades: {
        dilationupgrade: () => {
            gameData.dilationData.level++
            gameData.instanceData.amount -= gameData.dilationData.cost      
        },
        fractureupgrade:  () => {
            gameData.fractureData.level++
            gameData.momentData.amount -= gameData.fractureData.cost                     
        },
        rendupgrade: () => {
            gameData.rendData.level++
            gameData.kalpaData.amount -= gameData.rendData.cost
            gameData.instanceData.amount = 0
            gameData.momentData.amount = 0
            gameData.lustrumData.amount = 0
            gameData.dilationData.level = 0
            gameData.fractureData.level = 0
        }   
    } 
}




let gameData = {
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
}


function initializeValues() {
    gameData = save.gameLoad()
    updateUI()
    console.log(gameData)
    beginAutosave()
    console.log("Game initialized")
}



function gametick() {
    gameData.instanceData.amount += gameData.instanceData.gain
    updateUI()
    clearTimeout(tick)
    tick = setTimeout(gametick, gameData.tickspeedData.speed)
}




function updateUI() {
    updateValues()
    currency.updateUIAmounts(gameData.instanceData.amount,gameData.momentData.amount, gameData.lustrumData.amount, gameData.kalpaData.amount, gameData.dilationData.level, gameData.dilationData.multiplier, gameData.fractureData.level, gameData.rendData.level, gameData.rendData.multiplier)
    currency.updateUIFormulae(gameData.momentData.cost, gameData.momentData.multiplier, gameData.lustrumData.cost, gameData.lustrumData.exponent, gameData.kalpaData.cost, gameData.dilationData.cost, gameData.fractureData.cost, gameData.fractureData.chance, gameData.rendData.cost, gameData.tickspeedData.speed)
}

function updateValues() {
    let values = currency.recalculateValues(gameData.instanceData.gain, gameData.momentData.amount,gameData.momentData.cost, gameData.momentData.multiplier, gameData.lustrumData.amount, gameData.lustrumData.cost, gameData.lustrumData.exponent, gameData.kalpaData.amount, gameData.kalpaData.cost, gameData.dilationData.level, gameData.dilationData.cost, gameData.fractureData.level, gameData.fractureData.cost, gameData.fractureData.chance, gameData.rendData.level, gameData.rendData.cost, gameData.rendData.multiplier, gameData.tickspeedData.speed);
    
    gameData.momentData.cost = values.momentcost;
    gameData.momentData.multiplier = values.momentmultiplier;
    gameData.lustrumData.cost = values.lustrumcost;
    gameData.lustrumData.exponent = values.lustrumexponent;
    gameData.kalpaData.cost = values.kalpacost;
    gameData.dilationData.cost = values.dilationupgradecost;
    gameData.fractureData.cost = values.fractureupgradecost;
    gameData.fractureData.chance = values.fracturechance;
    gameData.rendData.cost = values.rendupgradecost;
    gameData.rendData.multiplier = values.rendmultiplier;
    gameData.tickspeedData.speed = values.tickspeed;
    gameData.instanceData.gain = values.instancegain;
}

// Adding event listeners

buttons.dilationButton.src.addEventListener('click', () => (purchase.purchaseUpgrade(gameData.dilationData, gameData.instanceData, upgrades.gainUpgrades.dilationupgrade, updateUI)));
buttons.fractureButton.src.addEventListener('click', () => (purchase.purchaseUpgrade(gameData.fractureData, gameData.momentData, upgrades.gainUpgrades.fractureupgrade, updateUI)));
buttons.rendButton.src.addEventListener('click', () => (purchase.purchaseUpgrade(gameData.rendData, gameData.kalpaData, upgrades.gainUpgrades.rendupgrade, updateUI)));
buttons.momentButton.src.addEventListener('click', () => purchase.purchaseConvert(gameData.momentData, gameData.instanceData,upgrades.conversionUpgrades.momentconversion, updateUI));
buttons.lustrumButton.src.addEventListener('click', () => purchase.purchaseConvert(gameData.lustrumData, gameData.momentData,upgrades.conversionUpgrades.lustrumconversion, updateUI));
buttons.kalpaButton.src.addEventListener('click', () => purchase.purchaseConvert(gameData.kalpaData, gameData.lustrumData, upgrades.conversionUpgrades.kalpaconversion, updateUI));
buttons.saveButton.src.addEventListener('click', () => save.gameSave(gameData));
buttons.loadButton.src.addEventListener('click', () => gameData = save.gameLoad(gameData));

// End of event listeners



function beginAutosave() {
    setInterval(() => save.gameSave(gameData), 30000)
}


let tick = setTimeout(gametick, gameData.tickspeedData.speed)

initializeValues()