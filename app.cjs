require("dotenv").config()
const {getDataQutoes} = require("./quotes.cjs")
const {getNewQuotes} = require("./utills.cjs")
const {getDataDeals, createNewDeal} = require("./deals.cjs")
const prompt = require("prompt-sync")()


async function main(){
    console.log("Geting Quotes from Unleashed")
    const getDataQuotesResponse =  await getDataQutoes(url=process.env.base_url+process.env.url_extend,process.env.api_id,process.env.api_key)
    console.log("Request completed")
    const first20Quotes = getDataQuotesResponse.Items.slice(0,20) // JSON data parsed by `data.json()` call first 20
    const todayDate =  Date.now()
    const sevenDaysAgoTimestamp = (todayDate - (7 * 24 * 60 * 60 * 1000)).toString();
    const newQuotes = await getNewQuotes(sevenDaysAgoTimestamp,first20Quotes)

    console.log("Geting Deals from Freshsales")
    const getDataDealsResponse = await getDataDeals(process.env.apiUrl,process.env.apiKey)
    console.log("Request completed")
    console.log("Preforming Comparison to find Quotes not registered as Deals")

    const QuotesEntered =  []
    newQuotes.map(newQuote=>{
      let flag = false
      getDataDealsResponse.map(deal=>{
        const QuoteNumber = newQuote.QuoteNumber.replace("0000","")
          if (QuoteNumber == deal.custom_field.cf_quote_number){
            flag = true
            console.log(QuoteNumber + " - " + deal.custom_field.cf_quote_number)
        
          QuotesEntered.push(newQuote.QuoteNumber.replace("0000",""))
        }
      })
    })

    
    const QuotesNotEntered = newQuotes.filter(newQuote=>{
      
      return !QuotesEntered.includes(newQuote.QuoteNumber.replace("0000",""))
    })
 
    console.log("Comparsion completed")

    return (QuotesNotEntered)
}

main()

module.exports = {main}

