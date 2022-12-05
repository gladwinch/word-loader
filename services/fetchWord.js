const axios = require('axios')
const db = require('../db')
const config = require('../config.json')
const utils = require('../utils')

async function fetchWord () {
    // fetch document from firestore list collection
    let lists = await db.fetchList()

    // get list id with zero value
    let listKey = selectIndex(lists)
    console.log('list key -<' , listKey)
    if(!listKey) {
        await db.resetList()
        return
    }
    
    let listId = config.list[listKey]
    let trelloListUrl = `https://api.trello.com/1/lists/${listId}?cards=all&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`

    console.log('listId: ', listId, ' listKey: ', listKey)

    let data = await axios.get(trelloListUrl)
    let cards = data.data.cards

    // update list
    db.updateList(listKey, lists[listKey]-1)

    if(!cards.length) return
    let card = cards[utils.getRandomInt(0, cards.length - 1)]

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

    let selectedIndex = utils.getRandomInt(0, listArr.length - 1)
    if(!listArr.length) return null

    return listArr[selectedIndex][0]
}

module.exports = fetchWord