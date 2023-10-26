import fetch from "node-fetch"

const { HmacSHA256,enc } = require("crypto-js")
require("dotenv").config()


const api_key = 'd2UhAeonPBKalSVL2UzS6AVoCNzQQz7OjqmyZgIStmjkZf7plnIP9kKP2MAYUHvQi6L5HYizMCXXWnwWvwRQ=='
const api_id = 'e5eef4d1-a12c-4f4a-9df8-bdcd01011639'

const base_url = 'https://api.unleashedsoftware.com/'
const url_extend = "SalesQuotes/1"



async function getDataQutoes(url,api_id,api_key) {
    // Default options are marked with *\
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "same-origin", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api-Auth-Id': api_id,
        'Api-Auth-Signature': getSignature("",api_key),
             
      }
    });
    const data = await response.json()
    return data;// parses JSON response into native JavaScript objects
}


function getSignature(args, privatekey) {
    const key = enc.Utf8.parse(privatekey);
    const hmac = HmacSHA256(args, key);
    const hmac64 = enc.Base64.stringify(hmac);
    return hmac64;
}


async function test(){
  console.log(await getDataQutoes(url=process.env.base_url+process.env.url_extend,process.env.api_id,process.env.api_key))
}

// test()

module.exports = {getDataQutoes}