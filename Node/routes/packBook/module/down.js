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

exports.downBookContent = function(user, isbn) {
  let menuUrl = "https://www.packtpub.com/mapt-rest/products/"+isbn+"/metadata";
  let menuData = request("GET", menuUrl);
  let menuParserData = JSON.parse(menuData.getBody());

  if (menuParserData.data.title.indexOf("[Video]") == -1) {
		if (menuParserData.status === 'success' && menuParserData.data.earlyAccess == false) {
			
			// console.log(mParserData.data.imageUrl) // 이미지
			menuParserData.data.tableOfContents.forEach(element => {
				let parentID = element.id
				let baseContentUrl = "https://www.packtpub.com/mapt-rest/users/me/products/"+isbn+"/chapters/"+parentID;
				let contentUrl, contentData, contentParserData;
				
				element.children.forEach(element => {
					if (parentID != element.id) {
						contentUrl = baseContentUrl + "/sections/" + element.id
					} else {
						contentUrl = baseContentUrl;
					}

					contentData = request("GET", contentUrl, {
						headers: {
							"Authorization" : user
						}
					});

					if (contentData.getBody().toString('utf-8') != "") {
						contentParserData = JSON.parse(contentData.getBody().toString('utf-8'));

						if (contentParserData.status === 'success') {
							if (contentParserData.data.entitled) {
                //contentParserData.data.content
								//fs.writeFileSync(bookPath+"/"+parentID+"_"+element.index+"_"+replace(element.title)+".html", contentParserData.data.content);
								console.log(parentID+"_"+element.index+"_"+element.title)
								//sleep(200);
							} else {
								//fs.writeFileSync(bookPath+"/"+parentID+"_"+element.index+"_"+replace(element.title)+"_demo.txt", contentParserData.data.content);
								console.log(parentID+"_"+element.index+"_"+element.title+"_demo")
							}
						}
					} else {
						console.log("error :" +parentID+"_"+element.index+"_"+element.title)
					} 
				})
			});    
		}
	}
}