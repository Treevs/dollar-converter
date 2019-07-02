// var amtStr = "$2523.04";
var amtStr = "$1,110,000";


// console.log(parseMoney(amtStr));



function parseMoney(amtStr) {
    amtStr = amtStr.replace(/,/g, "")
    var centString = "";
    var dollarString = "";
    var parsedString = "";
    if(amtStr.charAt(0) === '$') {
        parsedString = amtStr.substr(1)
    } else {
        return "Not a valid dollar amount (needs a $)";
    }
    var splitAmount = parsedString.split('.');
    var dollars = splitAmount[0];
    //Deal with orders of magnatude
    dollarString = parseDollars(dollars);

    //Deal with cents
    if(splitAmount.length === 2) {
        //Parse cents
        var cents = splitAmount[1];
        centString += "and "
        if(cents.length == 1) {
            //Pad with a zero
            centString += "0"
        }
        centString+= cents + "/100 "

    } else if(splitAmount.length === 1) {
        //This might be optional, depending upon whether or not you would rather have "and 00/000" or just leaving it out.
        // centString += "and 00/100 ";
    } else {
        return "Not a valid dollar amount";
    }



    parsedString
    var finalString = dollarString + centString + "dollars";
    return finalString; 
}

function parseDollars(dollars) {

    var singles = ["zero ", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ",
                "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ",
                "seventeen ", "eighteen ", "nineteen "];
    var tens = ["", "", "twenty ", "thirty ", "forty ", "fifty ",
    "sixty ", "seventy ", "eighty ", "ninety "]
    var scales = ["", "thousand ", "million ", "billion ", "trillion ", "quadrillion ", "quintillion *"];

    var dollarsString = "";
    var splitDollarsArray = [];
    var parsedDollarsArray = [];

    // console.log(dollars.substr(-2, 1))
    //Work backwards and split the string up
    for(var i= dollars.length; i>0; i-= 3) {
        var start = i-3;
        var end = 3 
        if(start < 0) {
            start = 0;
            end = start + i; // If i is between 0 and 3 non-inclusive it's going to be 1 or 2 here, the length of the substring.
        }
        // console.log(start + " " + i )
        // console.log(dollars.substr(start, end))
        splitDollarsArray.push(dollars.substr(start, end));
    }
    // console.log(splitDollarsArray);

    for (var i=0; i<splitDollarsArray.length; i++) {
        var parsedString = "";
        var dollarChunk = splitDollarsArray[i];
        var start = 0; 
        var end = dollarChunk.length;
        if(end == 3) {
            //We just need the first number here.
            var firstDollarChunk = parseInt(dollarChunk.charAt(0));

            if(firstDollarChunk != 0) {
                // console.log(dollarChunk)
                parsedString += singles[firstDollarChunk];
                if(dollarChunk.length == 3) {
                    parsedString += "hundred "
                } else {
                    // console.log(dollarChunk)
                }
            }
            start = 1; 
        }
        var secondDollarChunk = parseInt(dollarChunk.substr(start, end));
        if(secondDollarChunk != 0) {
            if(secondDollarChunk < 20) {
                //Need to hardcode the value of the number
                parsedString += singles[parseInt(secondDollarChunk)];
            } else {
                //Tens + single
                parsedString += tens[dollarChunk.charAt(start)];

                //Don't need to add a "-zero"
                if(dollarChunk.charAt(start+1) != '0')
                parsedString = parsedString.trim() + "-" + singles[dollarChunk.charAt(start+1)]
                
            }
            parsedString += scales[i];
        } else if (firstDollarChunk > 0) {
            parsedString += scales[i];
        }
        


        parsedDollarsArray.push(parsedString);
    }

    // console.log(parsedDollarsArray); 
    for(var i=parsedDollarsArray.length-1; i>=0; i--) {
        dollarsString+= parsedDollarsArray[i];
    }
    //Capitalize the first letter
    dollarsString = dollarsString.charAt(0).toUpperCase() + dollarsString.substr(1);
    return dollarsString;
}