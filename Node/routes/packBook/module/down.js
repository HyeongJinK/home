//packpub.com 웹크롤링
//isbn 정보가져와서 txt에 저장
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const request = require("sync-request");  
const cheerio = require("cheerio");

let url = "https://www.packtpub.com/all-books?search=&availability_list%5BAvailable%5D=Available&offset=&rows=48&sort=&theme_raw=true";
let checked = true;

exports.getIsbn = function(allBookCount) {
  let downBook = 0;
  const pageBookLength = 48;
  let isbnArray = new Array();

  while(checked) {
    url = "https://www.packtpub.com/all-books?search=&availability_list%5BAvailable%5D=Available&offset="+downBook+"&rows=48&sort=&theme_raw=true";
    
    var res = request("GET", url);
    var body = res.body.toString('utf-8');
    
    let $ = cheerio.load(body);
    let postElements = $("div.book-block-outer[data-product-id]");
  
    postElements.each(function() { 
      isbnArray.push($(this).attr("data-product-id"));    
    });
    downBook += pageBookLength;
  
    if (downBook > allBookCount) {
      checked = false;
    }
  }
  //console.log(isbnArray);
  return isbnArray;
}