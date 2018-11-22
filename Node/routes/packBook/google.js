const request = require("sync-request");
const cheerio = require("cheerio");

function translateApiCall(oriStr) {
    oriStr = oriStr.replace(/^\n/g, "");
    oriStr = oriStr.replace(/^\n/g, "");
    oriStr = oriStr.replace(/^\n/g, "");
    if (oriStr.replace(/\s/g, "") == "") {
        return "";
    }
    if (oriStr == "") {
        return "";
    }
    
    let formData = "key=AIzaSyBkoF9oYJIpYB_Msi2ZENcNOkld3jNo4_o&target=ko&q="+oriStr
    
    let res = request("post", 'https://www.googleapis.com/language/translate/v2', {
        headers: {       
                'content-type': 'application/x-www-form-urlencoded'
            },
        body: formData
        }
    );
    let trStr = JSON.parse(res.getBody());
    let trText = trStr.data.translations[0].translatedText 

    return trText;
}

exports.HtmlToWiki = function(h) {
    let temp = cheerio.load(h);
    let stop = 0;
    
    temp("h2.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        
        temp(this).text(temp(this).text() + " - " + replaceStr);
        temp(this).prepend("# ");
    });
    temp("h3.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());

        temp(this).text(temp(this).text() + " - " + replaceStr);
        temp(this).prepend("\n\n## ");
    });
    temp("h4.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        
        temp(this).text(temp(this).text() + " - " + replaceStr);
        temp(this).prepend("\n\n### ");
    });
    temp("h5.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        
        temp(this).text(temp(this).text() + " - " + replaceStr);    
        temp(this).prepend("\n\n#### ");
    });
    
    temp("pre.programlisting").prepend("\n\n```java\n").append("\n```");
    temp("strong").prepend("**").append("**");
    temp("img").each(function(i, elem) {
        temp(this).parent().prepend("\n\n![](" + temp(this).attr("src") + ")").append("\n");
    });
    temp("code.literal").each(function(i, elem) {
        temp(this).prepend("\`").append("\`");
        //temp(this).prepend("[[").append("]]");
    });
    temp("div.note p").prepend("> ");
    
    temp("p").each(function(i, elem) {        
        let replaceStr = translateApiCall(temp(this).text());
        
        temp(this).text(replaceStr);  
        temp(this).prepend("\n\n");
    });
    
    temp("ul").prepend("\n");
    temp("ol").prepend("\n");

    temp("ul").find("li").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        
        temp(this).text(replaceStr);  
        temp(this).prepend("\n* ");
    }); 
    
    temp("ol").find("li").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        
        temp(this).text(replaceStr);  
        if (temp(this).parent().attr("start") == undefined) {
            temp(this).prepend("\n1. ");
        } else {
            temp(this).prepend("\n"+temp(this).parent().attr("start")+ ". ");
        } 
    }); 

    temp("td").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        
        temp(this).text(replaceStr.replace(/^\n/g, "").replace(/^\n/g, ""));  
    }); 

    temp("table").each(function(i, elem) {
        temp(this).prepend("\n");
        temp(this).find("tr").each(function(j, elem) {
            let tdCount = temp(this).find("td").length;
            temp(this).prepend("\n|");

            if (j == 0) {
                temp(this).append("\n|")
                for (var z = 0; tdCount > z; z++) {
                    temp(this).append("-|")
                }
            }
        });
        temp(this).find("td").append("|")
    });
    
    return temp.text();//unescape(replace(htmlReplace(temp.html())));
}