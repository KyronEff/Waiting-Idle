/* Contains functions for currency calculation */


export function calculateMomentCost(moment) {
    return ((moment + 1) * 100) / 2;
}

export function calculateMomentMultiplier(moment) {
    return Math.max(1, Math.floor((1 + Math.log(moment + 1) / 2) * 100) / 100);
}

export function calculateLustrumCost(lustrum) {
    return ((lustrum + 1) * 20) / 2;
}

export function calculateLustrumExponent(lustrum) {
    return Math.max(1, Math.floor(1+(1.25-1) * (Math.log(lustrum+ 1) / Math.log(2+1)) * 100) / 100);
}

export function calculateKalpaCost(kalpa) {
    return Math.max(5, Math.ceil(1 + (7-1) * (kalpa**2.8)));
}

export function calculateDilationUpgradeCost(dilationupgradelevel) {
    return Math.floor(25 * (Math.log(dilationupgradelevel + 2)));
}

export function calculateFractureUpgradeCost(fractureupgradelevel) {
    return Math.floor(10 * Math.pow((Math.log(fractureupgradelevel + 2)),1.45));
}

export function calculateFractureUpgradeChance(fractureupgradelevel) {
    return Math.floor(((2 * Math.pow((Math.log(fractureupgradelevel + 2)),1.2)) * 100)) / 100;
}

export function isfracture(fracturechance) {
    return Math.random() * 100 < fracturechance;
}

export function calculateRendUpgradeCost(rendupgradelevel) {
    return Math.max(1, Math.ceil(1 + (7-1) * (rendupgradelevel**2.5)));
}

export function calculateRendMultiplier(rendupgradelevel) {
    return 2**rendupgradelevel;
}

export function calculateTickspeed(dilationupgradelevel) {
    return Math.floor(1000 * Math.pow(1 / 1.05, dilationupgradelevel) * 100) / 100;
}

export function calculateEffectiveInstanceGain(momentmultiplier,lustrumexponent,rendupgradelevel,rendmultiplier, fracturechance) {
    let effectiveinstancegain;
    let fractureevent = isfracture(fracturechance)
    if (fractureevent) {
        //console.log("Fracture")
        effectiveinstancegain = Math.floor(((momentmultiplier) ** lustrumexponent) * 2 );
        //console.log("Instance Gain" + effectiveinstancegain)
    } else {
        effectiveinstancegain = Math.max(1,Math.floor((momentmultiplier) ** lustrumexponent));
        //console.log("Instance gain No Fracture" + effectiveinstancegain)
    }
    if (rendupgradelevel > 0) {
            return effectiveinstancegain * rendmultiplier;
    }
    return effectiveinstancegain;
}

export function recalculateValues(instancegain, moment, momentcost, momentmultiplier, lustrum, lustrumcost, lustrumexponent, kalpa, kalpacost, dilationupgradelevel, dilationupgradecost, fractureupgradelevel, fractureupgradecost, fracturechance, rendupgradelevel, rendupgradecost, rendmultiplier, tickspeed) {

    momentcost = calculateMomentCost(moment);
    momentmultiplier = calculateMomentMultiplier(moment);
    lustrumcost = calculateLustrumCost(lustrum);
    lustrumexponent = calculateLustrumExponent(lustrum);
    kalpacost = calculateKalpaCost(kalpa);
    dilationupgradecost = calculateDilationUpgradeCost(dilationupgradelevel);
    fractureupgradecost = calculateFractureUpgradeCost(fractureupgradelevel);
    fracturechance = calculateFractureUpgradeChance(fractureupgradelevel);
    rendupgradecost = calculateRendUpgradeCost(rendupgradelevel);
    rendmultiplier = calculateRendMultiplier(rendupgradelevel);
    tickspeed = calculateTickspeed(dilationupgradelevel);
    instancegain = calculateEffectiveInstanceGain(momentmultiplier, lustrumexponent, rendupgradelevel, rendmultiplier, fracturechance);

    let values = {
    
    momentcost,
    momentmultiplier,
    lustrumcost,
    lustrumexponent,
    kalpacost,
    dilationupgradecost,
    fractureupgradecost,
    fracturechance,
    rendupgradecost,
    rendmultiplier,
    tickspeed,
    instancegain

    }
    updateUIFormulae(values.momentcost, values.momentmultiplier, values.lustrumcost, values.lustrumexponent, values.kalpacost, values.dilationupgradecost, values.fractureupgradecost, values.fracturechance, values.rendupgradecost, values.tickspeed)
    return values;
}






export function updateUIFormulae(momentcost, momentmultiplier, lustrumcost, lustrumexponent, kalpacost, dilationupgradecost,
    fractureupgradecost, fracturechance, rendupgradecost, tickspeed) {
    document.querySelector('.momentcostdisplay').textContent = momentcost + " Instances";
    document.querySelector('.momentmulti').textContent = momentmultiplier + "x";
    document.querySelector('.lustrumcostdisplay').textContent = lustrumcost + " Moments";
    document.querySelector('.instanceexp').textContent = lustrumexponent + "^";
    document.querySelector('.kalpacostdisplay').textContent = kalpacost + " Lustrum";
    document.querySelector('.dilationcostcount').textContent = dilationupgradecost + " Instances";
    document.querySelector('.fracturecostcount').textContent = fractureupgradecost + " Moments";
    document.querySelector('.doublechancetext').textContent = fracturechance + "%";
    document.querySelector('.rendcostcount').textContent = rendupgradecost + " Kalpa";
    document.querySelector('.tickspeedtext').textContent = tickspeed + "ms";   
}
export function updateUIAmounts(instances, moments, lustrum, kalpa, dilationupgradelevel, dilationupgrademultiplier, fractureupgradelevel, rendupgradelevel, rendmultiplier) {
    document.querySelector('.instances').textContent = instances;
    document.querySelector('.moments').textContent = moments;
    document.querySelector('.lustrum').textContent = lustrum;
    document.querySelector('.kalpa').textContent = kalpa;
    document.querySelector('.dilationlevelcount').textContent = dilationupgradelevel;
    document.querySelector('.multipliercount').textContent = dilationupgrademultiplier + "x";
    document.querySelector('.fracturelevelcount').textContent = fractureupgradelevel;
    document.querySelector('.rendlevelcount').textContent = rendupgradelevel;
    document.querySelector('.rendmultipliercount').textContent = rendmultiplier + "x";
}