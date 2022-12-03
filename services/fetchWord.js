const axios = require('axios')
const lists = require('../config.json')
const db = require('../db')
const config = require('../config.json')

async function fetchWord () {
    // get list id
    let lists = await db.fetchList()
    let listKey = selectIndex(lists)

    if(!listKey) {
        // :TODO resest list db
        return
    }
    
    let listId = config.list[listKey]
    let trelloListUrl = `https://api.trello.com/1/lists/${listId}?cards=all&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`

    console.log('listId: ', listId, ' listKey: ', listKey)

    let data = await axios.get(trelloListUrl)
    let cards = data.data.cards

    if(!cards.length) return
    let card = cards[getRandomInt(0, cards.length - 1)]

    return {
        id: card.id,
        word: card.name,
        defination: card.desc
    }
}

// helper fn

function selectIndex(list) {
    let listArr = Object.keys(list)
        .map((key) => [key, list[key]])
        .filter(list => list[1] > 0)

    let selectedIndex = getRandomInt(0, listArr.length - 1)
    if(!listArr.length) null

    return listArr[selectedIndex][0]
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = fetchWord