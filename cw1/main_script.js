var num1 = document.getElementById("number1")
var num2 = document.getElementById("number2")
var num3 = document.getElementById("number3")
var num4 = document.getElementById("number4")
const calculate_button = document.getElementById("calculate")
var sum_div = document.getElementById("sum")
var median_div = document.getElementById("median")
var min_div = document.getElementById("min")
var max_div = document.getElementById("max")

calculate_button.addEventListener("click", ()=>{
    calculate()
})

function calculate(){
    const sum = Sumnumbers(convertToNumber(num1.value), convertToNumber(num2.value), convertToNumber(num3.value), convertToNumber(num4.value))
    sum_div.value = sum
}

function convertToNumber(string){
    var num = Number(string);
    if (isNaN(num)) {
        return 0;
    }
    return num;
}

function Sumnumbers(v1 = 0, v2 = 0,v3 = 0,v4 = 0,){
    return v1 + v2 + v3 + v4;
}