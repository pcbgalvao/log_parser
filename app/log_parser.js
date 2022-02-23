const Fs = require('fs');
const readLine = require('readline');


// prints a help syntax 
function syntaxHelp(msg) {
    console.log("Syntax: log_parse <string> <logfile>");

}

// Parses data with given string
function parseData(data, stringToParse) {

    let resultMatch;
    let regex = new RegExp(`${stringToParse}`, '\g');

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
        console.log("Warning: Either no string to parse, logfile or both has been provided!");
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

    let matchesFound = 0;
    rl.on('line', function parseLine(lineText) {

        let matchesResult = parseData(lineText, stringToParse);
        matchesFound = (matchesFound) + matchesResult;

    });

    rl.on('close', function closeInterface() {
        // prints the result 
        console.log(`Matches Found for string "${stringToParse}" : ${matchesFound}`)

    });
}


main(process.argv);


