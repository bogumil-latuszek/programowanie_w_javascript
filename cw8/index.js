const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })
}
async function AsyncAddMany (numbers){
    const num_count = numbers.length;
    if(num_count == 1 || num_count == 0){
        return Promise.resolve(numbers)
    }
    else{
        let numbers_halved = [];
        if(num_count % 2 == 0){
            for (let i = 0; i < numbers.length; i+=2) {
                const sumOfTwo = await asyncAdd(numbers[i],numbers[i+1])
                numbers_halved.push(sumOfTwo);
            }
        }
        else{
            numbers_halved.push(numbers.pop())
            for (let i = 0; i < numbers.length; i+=2) {
                const sumOfTwo = await asyncAdd(numbers[i],numbers[i+1])
                numbers_halved.push(sumOfTwo);
            }
        }
        return AsyncAddMany(numbers_halved);
    }
}

async function MeasureTime (promise){
    const start = performance.now();
    await promise.resolve();
    const end = performance.now();
    return Promise.resolve(end - start)
}

let arr1 = [50,60,65,90];
let sum =  AsyncAddMany(arr1)
console.log(sum)