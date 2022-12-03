const axios = require('axios')
const lists = require('../lists.json')
const db = require('../db')

async function fetchWords () {
    // get list id
    let lists = await db.fetchList()
    let listKey = selectIndex(lists)

    if(!listKey) {
        // :TODO resest list db
        return
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

// fetchWords()
selectIndex(list)

// module.exports = fetchWOrds