const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const open = require('open');
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static("views"));
let startApp = (w, location) => {app.get('/', (req,res) => {
    res.render("template", {arr1 : w[0], arr2 : w[1], arr3 : w[2], location : location});
});} 
let start = (url) => {
    axios(url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let md_arr, arr1, arr2, arr3;
        md_arr = new Array();
        arr1 = new Array();
        arr2 = new Array();
        arr3 = new Array();
        const degrees = $('.TodayWeatherCard--TableWrapper--2kEPM', html).find('span[data-testid="TemperatureValue"]');
        const weather = $('.TodayWeatherCard--TableWrapper--2kEPM', html).find('.Column--icon--1MoS8');
        const rain = $('.TodayWeatherCard--TableWrapper--2kEPM', html).find('span[class="Column--precip--2ck8J"]');
        const location = $(".CurrentConditions--location--kyTeL", html).text();
        weather.each(function() {
            arr1.push($(this).text());
        });
        degrees.each(function() {
            arr2.push($(this).text());
        });
        rain.each(function() {
            let rainChance = $(this).text();
            rainChance =  ($(this).text().match(/\d+/))?$(this).text().match(/\d+/)[0]:rainChance;
            arr3.push((rainChance != "--")?`Rain Chance: ${rainChance}%`:"Rain Chance: --");
        });
        data = [arr1, arr2, arr3];
        open("http://localhost:8000/");
        startApp(data, location);
    }).catch();
}
start('https://weather.com/weather/today/');
app.listen(8000, () => console.log(`server is running on port 8000`));
