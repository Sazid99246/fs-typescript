const calculateBmi = (height: number, weight: number) => {
    const heightInMeter = height * 0.01
    const bmi = weight / (heightInMeter * heightInMeter)

    let status = "";
    if (bmi < 16) {
        status = "Underweight (Severe thinness)"
    } else if (bmi < 17) {
        status = "Underweight (Moderate thinness)"
    } else if (bmi < 18.5) {
        status = "Underweight (Mild thinness)"
    } else if (bmi < 25) {
        status = "Normal range"
    } else if (bmi < 30) {
        status = "Overweight (Pre-obese)"
    } else if (bmi < 35) {
        status = "Obese (Class I)"
    } else if (bmi < 40) {
        status = "Obese (Class II)"
    } else {
        status = "Obese (Class III)"
    }

    return status
}

console.log(calculateBmi(180, 74))
