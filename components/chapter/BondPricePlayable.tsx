"use client";

import PlayableFormula from "./PlayableFormula";

const bondInputs = [
    {
        label: "Coupon Rate",
        min: 1,
        max: 10,
        step: 0.25,
        defaultValue: 5,
        unit: "%",
    },
    {
        label: "Yield (Discount Rate)",
        min: 1,
        max: 15,
        step: 0.25,
        defaultValue: 6,
        unit: "%",
    },
    {
        label: "Years to Maturity",
        min: 1,
        max: 30,
        step: 1,
        defaultValue: 10,
    },
];

function calculateBondPrice(
    values: Record<string, number>
): { label: string; value: string }[] {
    const couponRate = (values["Coupon Rate"] ?? 5) / 100;
    const yieldRate = (values["Yield (Discount Rate)"] ?? 6) / 100;
    const years = values["Years to Maturity"] ?? 10;
    const faceValue = 1000;

    const coupon = faceValue * couponRate;

    // Bond Price = C × [(1 - (1+r)^-n) / r] + FV / (1+r)^n
    const pvAnnuity =
        yieldRate > 0
            ? coupon * ((1 - Math.pow(1 + yieldRate, -years)) / yieldRate)
            : coupon * years;
    const pvPar = faceValue / Math.pow(1 + yieldRate, years);
    const bondPrice = pvAnnuity + pvPar;

    let status = "At Par";
    if (bondPrice > faceValue + 1) status = "Premium";
    else if (bondPrice < faceValue - 1) status = "Discount";

    return [
        { label: "Bond Price", value: `$${bondPrice.toFixed(2)}` },
        {
            label: "Annual Coupon",
            value: `$${coupon.toFixed(2)}`,
        },
        { label: "Trading Status", value: status },
    ];
}

export default function BondPricePlayable() {
    return (
        <PlayableFormula
            formulaName="Bond Price Calculator"
            inputs={bondInputs}
            calculateOutput={calculateBondPrice}
        />
    );
}
