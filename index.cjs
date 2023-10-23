const express = require("express")
const app = express()
const {main} = require("./app.cjs")
const {createNewDeal} = require("./deals.cjs")
const cors = require("cors")
const bodyParser = require("body-parser")
let dealsToByCreated = []
const PORT = 5000 || process.env.PORT

app.use(cors())
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.json({message:"Hellow"})
     
})

app.get("/register_qoute_deals", async (req,res)=>{
    const quotestoResister = await main()

    if(quotestoResister){
        dealsToByCreated = quotestoResister
        res.json({
            message:"Processing complete",
            data:quotestoResister,
            status:1
        })
    }
    else if (quotestoResister.length == 0){
        res.json({
            message:"Processing complete \n Up to date",
            data:quotestoResister,
            status:2
        })  
    }
    else{
        res.json({
            message:"Processing complete \n Error occur",
            status:0
        }) 
    }
})

app.post("/create_deals", async(req,res)=>{
    const newDealsAdded = await createNewDeal(QuotesNotEntered,process.env.apiKey)
    
    if (newDealsAdded){
        res.json({
            message:"New deals created now visit freshsales for update",
            data:newDealsAdded,
            status:1
        })
    }
    else{
        res.json({
            message:"Error no deals created",
            data:[],
            status:0
        })  
    }
})

app.listen(PORT,()=>{
    console.log("listening on port " + PORT )
})

