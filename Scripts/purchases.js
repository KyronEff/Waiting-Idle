// Purchase functions //

export function purchaseUpgrade(upgrade, currency, upgradetype, update) {
    if (currency.amount >= upgrade.cost && upgrade.level <= upgrade.max - 1 ){
        upgradetype();
    }
    update()
}

export function purchaseConvert(convert, currency,conversiontype, update) {
    if (currency.amount >= convert.cost){
        conversiontype();
    }
    update()
}

// buttons.fractureButton.src.addEventListener('click', () => (purchase.purchaseUpgrade(gameData.fractureData, gameData.momentData, updateUI)));
// buttons.dilationButton.src.addEventListener('click', () => (purchase.purchaseUpgrade(gameData.dilationData, gameData.instanceData, updateUI)));