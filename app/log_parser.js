const Fs = require('fs');
// const Regex = require('regex');
const { exit } = require('process');

function syntaxHelp(msg) {
    console.log("Syntax: log_parse <string> <logfile>");

}

function main(argv) {

    // Taking string to parse and log file from command line args
    var stringToParse = argv[2]
    var logFile = argv[3]

    console.log(argv[2], "--help", argv[2] === "--help");
    // Syntax Help
    if (argv[2] === "--help" || argv[2] === "/h") {

        syntaxHelp();
        process.exit(0);
    }

    // Test for correct number of args
    if (argv.length !== 4) {
        console.log("Warning: Either no string to parse, logfile or both has been provided!");
        syntaxHelp();
        process.exit(1);
    }

    // Tests for the existence of logfile provided

    if (!Fs.existsSync(logFile)) {
        console.log(`Error: File "${logFile}" not found!`)
        process.exit(1);
    }

    // Parsing logfile
    console.log (`Parsing "${logFile}" with string "${stringToParse}"`);


    
}

main(process.argv);


