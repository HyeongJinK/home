const request = require("sync-request");
const cheerio = require("cheerio");

const naverId = ['PIzcrH8b_OVhgqHKguPr','c39XRmuZCJ3A1fANGlcf','3eJTPsF5z0Pd0M_nq5P8', 'pxbwvspJZrne2m7B4sdM','OXxix1TtpCJiToTABQT9','VcwBQ20yokWNxNXr28_P','XpfDMtSUjHpFaov4WPZm','V7rQE4ImkaHPCWwJL_G_','U9QnRU7H0Yc7JOvdHmHo','AqcSjeObhRngK9fLdXPe','TS5gt1Hp5fQnYwaMc4nU','p1z0mZotzmhC21NQXrnX','IoDbeaQW6IheuqU8_0Pc','sY5yuCgciE4C_o49U75w','3paoxaYXx5idPL_oMQq9','V6vwzLk9TRuzlc4_EV1y','h1KwBaBrNGRXS2oOdItm','Dm9ko64LmAvtnbV1NwGP','6GVGU9_7lT7EWhjM_M8i','1sOur5xeWdrC3ZJgymgE','p7T9C2IBEUsBjtfoNvCe','RctAZuQAXKZqh3PYX2Yf','ohdHArD08BHEa0_o0LcM','9UNuyv5poko_ZLZO0HyP','TY3OxeWbsuSid3MJ7EJ2','WLZOjngGKyPc7A73lG7u','i1lkXXeopYn1WFJjgnev','IMsmn5ZC8tYSUGPvCzCa','lUzOzoSVI3Syul8AhU1B', 'DmfE2BV3Xgy2W8qYhNOc','Rq253oC6hoHXCInPlrON','7TkoSEcwWyS6xPsfNhqi','F5G1qVCgo4DR4OWZtESY','i6XM4cpFqhfWJ_Qll9oH','yZMTZ2blAaqOP7R_Hk_e','JTpeZXNyX1BXF55RD8Gz','GOJIr5XJwHU2RKpD11BE','U4YDg0rvFaUQo_tU7Ygg','WzH3MtYkrgHV6DECIRvG','gTd6Nn7pjKhNOUK6gKLQ'];
const naverSecret = ['IC57QXbTkQ', 'KkBf_8n9nP', 'pePl0dDFLK', 'LlEHqsIH8P','_oA5h0Wsg4', '7pxQoakogu', '7063e9k4FZ', 'inliX0U89t', '8ZYQZxPyMY', 'BAPgAbfZwR', 'oMzTFOvzn7', 'eQP2hUp7PI', 'KUWg0lEeR1', 'EonGckqKSk', 'bFwuSy6WfI', 'GqMSH9D7al', 'fT0KTkTgUj', 'ALUKeRQ8dj', 'Toulsx9UHX', 't6BdmjhiCd', '5qh3SvKj0D', 'eFxB0x6FLE', 'bIMsZqbyg3', 'QkJSsgX2La', 'oxYBd15KZe', 'mQlWZ4K0Et', 'mZWk3_h27c', 'eFdp5UkDIC', 'lMuCbbnUQK', 'xDNGltf19x', '6ENodJhNjc', 'uBcL3eAgMi', 'kNv7Q98OR3', 'J0qLoVJnTL', 'Iltw3QWWtu', '5BP6rCKlYl', 'q289U6Nd6c', 'KNgnsMpWjM', '2vQZGzWt3v', 'aYCSN0AAdP'];
let currentNaver = 0;
function translateApiCall(oriStr) {
    oriStr = oriStr.replace(/^\n/g, "");
    if (oriStr.replace(/\s/g, "") == "") {
        return "";
    }
    try {
        let formData = "source=en&target=ko&text="+oriStr
            
        var res = request("post", 'https://openapi.naver.com/v1/papago/n2mt', {
            headers: {       
                    'content-type': 'application/x-www-form-urlencoded'
                    , 'X-Naver-Client-Id': naverId[currentNaver]
                    , 'X-Naver-Client-Secret': naverSecret[currentNaver]
                },
            body: formData
            }
        );

        var trStr = JSON.parse(res.getBody('utf8'));
        let trText = trStr.message.result.translatedText 

        return trText;
    } catch (e) {
        ++currentNaver;
        console.log(e);        
        console.log("currentNaver = " + currentNaver);
        if (currentNaver >= naverId.length) {
            return -1;
        } else {
            return translateApiCall(oriStr);
        }
    }
}

exports.HtmlToWiki = function(h) {
    let temp = cheerio.load(h);
    let stop = 0;
    temp("h2.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(temp(this).text() + " - " + replaceStr);
        temp(this).prepend("# ");
    }); if (stop == -1) return -1

    temp("h3.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(temp(this).text() + " - " + replaceStr);
        temp(this).prepend("\n\n## ");
    }); if (stop == -1) return -1
    temp("h4.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(temp(this).text() + " - " + replaceStr);
        temp(this).prepend("\n\n### ");
    }); if (stop == -1) return -1
    temp("h5.title").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(temp(this).text() + " - " + replaceStr);    
        temp(this).prepend("\n\n#### ");
    }); if (stop == -1) return -1
    
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
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(replaceStr);  
        temp(this).prepend("\n\n");
    }); if (stop == -1) return -1
    
    temp("ul").prepend("\n");
    temp("ol").prepend("\n");

    temp("ul").find("li").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(replaceStr);  
        temp(this).prepend("\n* ");
    }); if (stop == -1) return -1
    
    temp("ol").find("li").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(replaceStr);  
        if (temp(this).parent().attr("start") == undefined) {
            temp(this).prepend("\n1. ");
        } else {
            temp(this).prepend("\n"+temp(this).parent().attr("start")+ ". ");
        } 
    }); if (stop == -1) return -1

    temp("td").each(function(i, elem) {
        let replaceStr = translateApiCall(temp(this).text());
        if (replaceStr == -1) {
            stop = -1;
            return -1;
        }
        temp(this).text(replaceStr.replace(/^\n/g, "").replace(/^\n/g, ""));  
    }); if (stop == -1) return -1

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