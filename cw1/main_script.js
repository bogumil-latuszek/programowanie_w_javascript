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
    val1 = convertToNumber(num1.value)
    val2 = convertToNumber(num2.value)
    val3 = convertToNumber(num3.value)
    val4 = convertToNumber(num4.value)


    const sum = SumNumbers(val1, val2, val3, val4)
    sum_div.value = sum

    const med = Median(sum)
    median_div.value = med

    const min = Min(val1, val2, val3, val4)
    min_div.value = min

    const max = Max(val1, val2, val3, val4)
    max_div.value = max
}

function convertToNumber(string){
    var num = Number(string);
    if (isNaN(num)) {
        return 0;
    }
    return num;
}

function SumNumbers(v1 = 0, v2 = 0,v3 = 0,v4 = 0,){
    return v1 + v2 + v3 + v4;
}

function Median(num){
    return num/4;
}

function Min(v1 = 0, v2 = 0,v3 = 0,v4 = 0,){
    let min = v1
    if (v2<min) min = v2;
    if (v3<min) min = v3;
    if (v4<min) min = v4;
    return min
}

function Max(v1 = 0, v2 = 0,v3 = 0,v4 = 0,){
    let min = v1
    if (v2>min) min = v2;
    if (v3>min) min = v3;
    if (v4>min) min = v4;
    return min
}

