const arrtest = [2,4,6,5,67,54,3,67,8, 8]
const arrtest2 = [2,566 ,67,8, 8,444,6]

const arrtest3 = arrtest.filter(newQuote=>{
    console.log(newQuote)
    return  !arrtest2.includes(newQuote)
  })


console.log(arrtest3)