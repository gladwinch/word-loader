const axios = require('axios')
const cheerio = require('cheerio')

async function findSentences (word) {
    const uri = `https://us-central1-nodejs-jobsearch.cloudfunctions.net/fetcher?auth=${process.env.FETCH_API_KEY}`
    let { data } = await axios.post(uri, { 
        url: `https://sentencedict.com/${word}.html` 
    })

    let htmlData = data.data
    const $ = cheerio.load(htmlData);

    let sentences = $('#all').find('div').toArray()
        .map(element => $(element).text())

    return sentences.filter(str => str.charAt(0) !== '(' && str.length > 0)
}

module.exports = findSentences