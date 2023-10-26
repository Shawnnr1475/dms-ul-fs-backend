require("dotenv").config()
import fetch from "node-fetch"


function getNewQuotes(sevenDaysAgoTimestamp,quotes){
    let newQuotes = quotes.filter(quote=>{
      return getDateFromTimestand(quote.QuoteDate) >= sevenDaysAgoTimestamp
    })
  
    return newQuotes
  }

function getDateFromTimestand(qoutesDate){
    let timestamp = qoutesDate.replace("/Date(","")
    timestamp = timestamp.replace(")/","")
    return timestamp
  }

  async function getDataAccounts(apiKey) {
    const accountsapiUrl = 'https://dwykaminingservices.myfreshworks.com/crm/sales/api/sales_accounts/view/30001986370?page='
    let accounts =  []
    // Default options are marked with *
    for(let i = 1; i <= 22; i++){
      const response = await fetch(`${accountsapiUrl}`+i, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          'Authorization': `Token token=${apiKey}`,
          'Content-Type': 'application/json'
               
        }
      });
      const data =  await response.json()
      accounts = accounts.concat(data.sales_accounts)
    }
    return accounts;// parses JSON response into native JavaScript objects
  }
  
  async function getDataSalePersons(apiKey) {
    const salePersonsapiUrl = 'https://dwykaminingservices.myfreshworks.com/crm/sales/api/selector/owners'
    let salePersons =  []
    // Default options are marked with *
    const response = await fetch(`${salePersonsapiUrl}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "same-origin", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Authorization': `Token token=${apiKey}`,
        'Content-Type': 'application/json'
               
      }
      });
      const data =  await response.json()
      salePersons = salePersons.concat(data.users)
      return salePersons;// parses JSON response into native JavaScript objects
    }


  function getAccountByName(accounts,name){
    const account = accounts.find(element=>{
      return element.name===name})
  
    if (account){
      return(account.id)
    }
    else{
      return null
    }
    
  }
  
function getSalePersonByName(salePersons,name){
 
  const SalePerson = salePersons.find(element=>{
    return element.display_name == name})
  if (SalePerson){
    return(SalePerson.id)
  }
  else{
    return null
  }
  
}


async function getCurrencies(){
  const currURL = "https://dwykaminingservices.myfreshworks.com/crm/sales/api/selector/currencies"
  const response = await fetch(`${currURL}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      'Authorization': `Token token=${process.env.apiKey}`,
      'Content-Type': 'application/json'
             
    }
    });
  const currencies =  await response.json()


}


async function test(){
    const a = await getDataSalePersons(process.env.apiKey)
    const name = 'Rethabile Letlala'
    console.log(getSalePersonByName(a,name))

}
module.exports = {getNewQuotes,getAccountByName,getSalePersonByName,getDataAccounts,getDataSalePersons}