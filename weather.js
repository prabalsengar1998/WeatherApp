const express=require("express")
const https=require("https")
const bodyparser=require("body-parser")
const chalk=require("chalk")
const ejs=require("ejs")

const app=express()

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",function(req,res){
    res.sendFile(__dirname+"/weather.html")
})

app.post("/",function(req,res){
    var city=req.body.cityName
    const apiKey="1f94a43222470abf2b8a85be07bf7693"
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            var weatherData=JSON.parse(data)
            var temp=weatherData.main.temp
            var description=weatherData.weather[0].description
            var imageCode=weatherData.weather[0].icon
            var imageUrl="https://openweathermap.org/img/wn/"+imageCode+"@2x.png"
            
            res.render("weather",{city:city,temp:temp,description:description,imageUrl:imageUrl})
        })
    })
})
const port=process.env.PORT||3000
app.listen(port,function(){
    console.log(chalk.green.inverse("server is running on port "+port))
})
