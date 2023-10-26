const { getDataAccounts, getAccountByName, getDataSalePersons, getSalePersonByName } = require("./utills.cjs")
const dealsapiUrl = 'https://dwykaminingservices.myfreshworks.com/crm/sales/api/deals'
require("dotenv").config()
import fetch from "node-fetch"


async function getDataDeals(apiUrl,apiKey) {
    let deals =  []
    // Default options are marked with *
    for(let i = 1; i <= 5; i++){
      const response = await fetch(`${apiUrl}`+i, {
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
      deals = deals.concat(data.deals)
    }
    return deals;// parses JSON response into native JavaScript objects
  }

async function createNewDeal(deals,apiKey){
  const accounts = await getDataAccounts(apiKey)
  const salePersons = await getDataSalePersons(apiKey)
    deals.map(async deal=>{
      const accountID = getAccountByName(accounts,deal.Customer.CustomerName)
 
      const salePersonID = getSalePersonByName(salePersons, deal.SalePerson?deal.SalePerson.FullName:null )
      const dealData = {"deal":{
        "name": "Test " + deal.CustomerRef, 
        "amount":deal.Total,
        "custom_field":{
          "cf_quote_number": deal.QuoteNumber.replace("0000",""),
            "cf_group_entity": "DMS-ZA"
        },
        "sales_account_id": accountID,
        "owner_id":salePersonID}}
      const response = await fetch(`${dealsapiUrl}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "same-origin", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          'Authorization': `Token token=${apiKey}`,
          'Content-Type': 'application/json'
               
        },
        body: JSON.stringify(dealData),
      });
  
      data = await response.json()
   
      return data
  
    })
}

async function test(){
    console.log(await getDataDeals(process.env.apiUrl,process.env.apiKey))
}

// test()



module.exports = {getDataDeals,createNewDeal}