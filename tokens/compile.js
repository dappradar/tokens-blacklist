'use strict';
const fs = require('fs');

// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);


const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

const allTokens = () => {
    let allTokens = []
    let protocols = 0;
    getDirectories(__dirname).forEach(protocol => {
        protocols++;
        console.log(protocols);
        let data = JSON.parse(fs.readFileSync(`${__dirname}/${protocol}/tokens.json`));
        let tokens = data.tokens;
        let chainId = data.chainId;
        let buildTokens = tokens.map(token => {return {"address": token, "chainId": chainId}})
        allTokens.push(...[...buildTokens]);
        if (protocols === getDirectories(__dirname).length) {
            let jsonData = JSON.stringify({
                "name": "All Tokens Blacklist",
                "updated": Date.now(),
                "tokens": allTokens
            })
            fs.writeFileSync('all-tokens.json', jsonData);
        }
    })
}

allTokens();