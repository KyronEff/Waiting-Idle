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
    const base = 1;
    const growthRate = 0.25;
    let exponent = (base + growthRate * Math.log(lustrum + 1));
    return Math.max(1, Math.floor(exponent*100) / 100);
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
    document.querySelector('[data-type="moment-cost"]').textContent = momentcost + " Instances";
    document.querySelector('[data-type="moment-multiplier"]').textContent = momentmultiplier + "x";
    document.querySelector('[data-type="lustrum-cost"]').textContent = lustrumcost + " Moments";
    document.querySelector('[data-type="lustrum-exponent"]').textContent = lustrumexponent + "^";
    document.querySelector('[data-type="kalpa-cost"]').textContent = kalpacost + " Lustrum";
    document.querySelector('[data-type="dilation-cost"]').textContent = dilationupgradecost + " Instances";
    document.querySelector('[data-type="fracture-cost"]').textContent = fractureupgradecost + " Moments";
    document.querySelector('[data-type="fracture-chance"]').textContent = fracturechance + "%";
    document.querySelector('[data-type="rend-cost"]').textContent = rendupgradecost + " Kalpa";
    document.querySelector('[data-type="tickspeed"]').textContent = tickspeed + "ms";   
}
export function updateUIAmounts(instances, moments, lustrum, kalpa, dilationupgradelevel, fractureupgradelevel, rendupgradelevel, rendmultiplier) {
    document.querySelector('[data-type="instance-amount"]').textContent = instances;
    document.querySelector('[data-type="moment-amount"]').textContent = moments;
    document.querySelector('[data-type="lustrum-amount"]').textContent = lustrum;
    document.querySelector('[data-type="kalpa-amount"]').textContent = kalpa;
    document.querySelector('[data-type="dilation-level"]').textContent = dilationupgradelevel;
    document.querySelector('[data-type="fracture-level"]').textContent = fractureupgradelevel;
    document.querySelector('[data-type="rend-level"]').textContent = rendupgradelevel;
    document.querySelector('[data-type="rend-multiplier"]').textContent = rendmultiplier + "x";
}