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
