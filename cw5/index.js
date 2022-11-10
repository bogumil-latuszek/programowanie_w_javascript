//let functions_array = [saveCToSessionStorage, saveDToSessionStorage ]
let functions_array = [(data)=>{saveCToSessionStorage(data); Logger.log(data)}, saveDToSessionStorage() ]

interval(functions_array);
StartFuctionsAfterInterval(functions_array, SetRandomInterval);

function interval(functions_array) {
  let timer = 1
  setInterval(
    () => {
      // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
      
      for (let index = 0; index < functions.length; index++) 
        {
            functions[index](timer)
        }
      timer++
    }
    , 2000)
}
function StartFuctionsAfterInterval(FunctionsArray, source){
    source(FunctionsArray)
}
function SetRandomInterval(functions) {
    let timer = Math.random()* 10000
    setInterval(
      () => {
        // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
        
        for (let index = 0; index < functions.length; index++) 
          {
              functions[index](timer)
          }
        timer++
      }
      , 2000)
  }

class Logger {
  static log(data) {
    console.log(data)
  }
}

function saveToSessionStorage(label, log_func = (x)=>{}) {
    return (data)=>{
        console.log(`[reader ${label}]`, data)
        const storageData = { data }
        sessionStorage.setItem(label, JSON.stringify(storageData))
        // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
        callback(data);
    }
  }

function saveCToSessionStorage(data) {
  console.log('[reader C]', data)
  const storageData = { data }
  sessionStorage.setItem('C', JSON.stringify(storageData))
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
}

function saveDToSessionStorage(data) {
  console.log('[reader D]', data)
  const storageData = { data }
  sessionStorage.setItem('D', JSON.stringify(storageData))
}