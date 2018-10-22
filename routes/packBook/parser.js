var cheerio = require("cheerio");

exports.HtmlToWiki = function(h) {
    let temp = cheerio.load(h);

    temp("h2.title").each(function(i, elem) {
        temp(this).text(temp(this).text() + " - " + translateApiCall(temp(this).text()));  
        temp(this).prepend("# ");
    });
    temp("h3.title").each(function(i, elem) {
        temp(this).text(temp(this).text() + " - " + translateApiCall(temp(this).text()));  
        temp(this).prepend("\n\n## ");
    });
    temp("h4.title").each(function(i, elem) {
        temp(this).text(temp(this).text() + " - " + translateApiCall(temp(this).text()));  
        temp(this).prepend("\n\n### ");
    });
    temp("h5.title").each(function(i, elem) {
        temp(this).text(temp(this).text() + " - " + translateApiCall(temp(this).text()));  
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
        temp(this).text(translateApiCall(temp(this).text()));  
        temp(this).prepend("\n\n");
    });
    
    temp("ul").prepend("\n");
    temp("ol").prepend("\n");

    temp("ul").find("li").each(function(i, elem) {
        temp(this).text(translateApiCall(temp(this).text()));
        temp(this).prepend("\n* ");
    });
    
    temp("ol").find("li").each(function(i, elem) {
        temp(this).text(translateApiCall(temp(this).text()));  
        if (temp(this).parent().attr("start") == undefined) {
            temp(this).prepend("\n1. ");
        } else {
            temp(this).prepend("\n"+temp(this).parent().attr("start")+ ". ");
        } 
    });

    temp("td").each(function(i, elem) {
        temp(this).text(temp(this).text().replace(/^\n/g, "").replace(/^\n/g, ""));
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