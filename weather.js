const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
const chalk=require("chalk")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",function(req,res){
     res.sendFile(__dirname+"/weather.html")    
})

app.post("/",function(req,res){
    var city=req.body.cityName
    var apiKey="1f94a43222470abf2b8a85be07bf7693"

    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+",India&appid="+apiKey+"&units=metric"
    https.get(url,function(response){
            response.on("data",function(data){
                var weatherData=JSON.parse(data)
                var description=weatherData.weather[0].description
                var temperature=weatherData.main.temp
                var icon=weatherData.weather[0].icon

                var imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

                res.write("<h1>desription: "+description+"</h1>")
                res.write("<h1>temperature: "+temperature+" c</h1>")
                res.write("<img src="+imageUrl+">")
                res.send()
            })
    })

})

app.listen(5000,function(){
    console.log(chalk.green.inverse("server is running"));
})


