const axios = require('axios');
const cheerio = require('cheerio');
var dataArr = [];
let link = '';

function getData(url){
    link = url;

axios.get(url).then(function(res){
    const $ = cheerio.load(res.data);
    const $userInterFace = $("div.content--profile").children("div.profile-character-info");
    $userInterFace.each(function(index, elem){
        var userData = {
            Name: $(this).find('span.profile-character-info__name').text(),
            lv: $(this).find('span.profile-character-info__lv').text(),
            class: $(this).find('img.profile-character-info__img').attr('alt'),
            classIco: $(this).find('img.profile-character-info__img').attr('src'),
            server: $(this).find('span.profile-character-info__server').text().substring(1)
        }
        var dataArr = JSON.stringify(userData);
        // console.log(dataArr);
    });
})
.then(function(){
    // console.log(dataArr);
    return dataArr;
})

}

module.exports = { getData };
