// Write Javascript code here
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const writeStream = fs.createWriteStream("movies.csv");

// Write Headers
writeStream.write(`Title,Year,ImageURL,MXPlayerLink \n`);

const URL = "https://www.mxplayer.in/movies";

request(URL, function(err, res, html) {
  if (err) {
    console.log(err);
  } else {
    // console.log(html)
    const $ = cheerio.load(html);
    // console.log($('.section-content-container').text().split(","))
    // console.log($('.section-content-container a').text())
    $(".section-content-container a").each((i, el) => {
      mxplayerLink = $(el).attr("href");
      imageURL = $(el)
        .find(".card-image-content")
        .children("img")
        .attr("src");

      var movie = $(el)
        .find(".card-details")
        .text()
        .replace(/,/, "");
      var arr = movie.split(",");
      if (arr[1]) {
        writeStream.write(
          `${arr[0]}, ${arr[1]}, ${imageURL}, ${mxplayerLink} \n`
        );
      }
    });

    // const arr = [];
    // let $ = cheerio.load(body);
    // console.log($);
    // $('div._1HmYoV > div.col-10-12>div.bhgxx2>div._3O0U0u').each(function(index){
    //     console.log(index)
    //     const data = $(this).find('div._1UoZlX>a').attr('href');
    //     const name = $(this).find('div._1-2Iqu>div.col-7-12>div._3wU53n').text();
    //     const obj = {
    //         data : data,
    //         name : name
    //     };
    //     console.log(obj);
    //     arr.push(JSON.stringify(obj));
    // });
    // console.log(arr.toString());
    // fs.writeFile('data.txt', arr, function (err) {
    //     if(err) {
    //         console.log(err);
    //     }
    //         else{
    //             console.log("success");
    //         }
    // });
  }
});
