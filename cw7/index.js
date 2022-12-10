let async_functions_running = 0;
async function start_monitoring_async_functions(){
    let cont = await await1sec();
    console.log("async func run:"+async_functions_running) //doesnt count itself
    if(cont == true){
    start_monitoring_async_functions()
    return new Promise((resolve, reject) => {
        resolve(console.log("10 seconds of monitoring passed"))
    })
    }
}

async function await1sec(){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
          resolve(true)
        }, 1000)
    })
}


const asyncAdd = async (a,b) => {
    async_functions_running += 1;
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    }).then(async_functions_running -= 1)
}
async function AsyncAddMany (numbers){
    async_functions_running += 1;
    const num_count = numbers.length;
    if(num_count == 1){
        return new Promise((resolve, reject) => {
            resolve(numbers[0]);
        }).then(async_functions_running -= 1)
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
        return new Promise((resolve, reject)=>{
            resolve(AsyncAddMany(numbers_halved));
        }).then(async_functions_running -= 1)
    }
}

async function MeasureTime(){
    const start = performance.now();
    await promise.resolve();
    const end = performance.now();
    return new Promise((resolve, reject) => {
        resolve(end - start)
    })
}


//main:

let arr1 = [];

for (let i = 0; i < 100; i++) {
    let new_number = Math.random()*100;
    arr1.push(new_number);
}
start_monitoring_async_functions();//monitoring
let startTime = performance.now();
AsyncAddMany(arr1).then((sum)=>{
    console.log("suma: "+ sum);
    const delta_time = (performance.now() - startTime)/1000;
    console.log("czas obliczeń: " + delta_time + "sekund");
})

