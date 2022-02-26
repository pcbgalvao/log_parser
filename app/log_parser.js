const Fs = require('fs');
const readLine = require('readline');


// prints a help syntax 
function syntaxHelp(msg) {
    console.log("Syntax: log_parse <string> <logfile>");

}

// Special Char to be Sanitized
// 
// Brackets: []
// Parentheses: ()
// Curly braces: {}
// Operators: *, +, ?, |
// Anchors: ^, $
// Others: ., \

// [ \ ^ $ . | ? * + ( )

function escapeSpecialChar(stringToParse) {
    let sanitazedTempString = "";
    for (idx = 0; idx < stringToParse.length; idx++) {
        let c = stringToParse[idx];
        if (["\[", "\(", "\)", 
            "\*", "\+", "\?", "\|", "\^", "\$",
            "\.", "\,"].includes(c)) {
            c = '\\'+c;
            console.log("voila, voila", c);
        }
        sanitazedTempString+=c;        
        //console.log ("char-", c);
        //console.log ("char-", idx);
        //console.log ("char-", stringToParse.length);

    }
    console.log("sanitazedTempString", sanitazedTempString);
    return sanitazedTempString
}

// Parses data with given string
function parseData(data, stringToParse) {

    let resultMatch;
    let sanitazedString = escapeSpecialChar(stringToParse)
    let regex = new RegExp(`${sanitazedString}`, '\g');

    resultMatch = (data.match(regex) || []);
    return (resultMatch.length);

}


function main(argv) {

    // Taking string to parse and log file from command line args    
    var stringToParse = argv[2];
    var logFile = argv[3];

    // syntax Help
    if (argv[2] === "--help" || argv[2] === "/h") {

        syntaxHelp();
        process.exit(0);
    }

    // test for correct number of args
    if (argv.length !== 4) {
        console.log("Warning: please check the syntax");
        syntaxHelp();
        process.exit(1);
    }

    // tests for the existence of "logfile" provided

    if (!Fs.existsSync(logFile)) {
        console.log(`Error: File "${logFile}" not found!`)
        process.exit(1);
    }

    // parsing logfile, line by line 
    //
    let logFileInterface = {
        input: Fs.createReadStream(logFile),
        output: process.stdout,
        terminal: false
    }
    let rl = readLine.createInterface(logFileInterface);

    // processes "Line" event on logfile ReadStream Interfrace
    let matchesFound = 0;
    rl.on('line', function parseLine(lineText) {

        let matchesResult = parseData(lineText, stringToParse);
        matchesFound = (matchesFound) + matchesResult;

    });

    // processes "close" event on logfile ReadStream Interface
    rl.on('close', function closeInterface() {
        // prints the result 
        console.log(`Matches Found for string "${stringToParse}" : ${matchesFound}`)

    });

    // processes "error" event on logfile ReadStream Interface
    rl.on('error', function errorInterface(error) {
        // prints the result 
        console.log(`Error: "${error}"`)

    });
}


main(process.argv);


//module.exports(
//     ()=>main()
//);