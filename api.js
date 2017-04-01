'use strict';

module.exports = (app, db) => {
const request = require('request')
const CX = process.env.CX
const API_KEY = process.env.API_KEY

const getApiData = (req, res, query, offset) => {
  request.get('https://www.googleapis.com/customsearch/v1?key=' + API_KEY + '&cx=' + CX + '&searchType=image&q=' + query +'&start=' + offset, 
  (err, response, body) => {
    if (!err && response.statusCode == 200) {
        let dataArr = []
        let dataSet = JSON.parse(body).items
        for(let i = 0; i < dataSet.length; i++) {
            let data = dataSet[i]
            let imgUrl = data.link
            let altText = data.snippet
            let pageUrl = data.contextLink
            
            let obj = {
                "url": imgUrl,
                "alt": altText,
                "context": pageUrl
            }
            
            dataArr.push(obj)
        }
        
        res.send(dataArr)
    }
  })
}

const save = searchQuery => {
    let collection = db.collection('queries')
    collection.save(searchQuery, (err) => {
        if(err) throw err
    })
}

    app.get('/api/imagesearch/:query(*)', (req, res) => {
        let query = req.params.query
        let offset = 1
        if(req.query.offset) {
            offset = req.query.offset
        }
        
        let date = new Date().toISOString()
        
        let searchQuery = {
            "query": query,
            "date": date
        }
        
        save(searchQuery)
        
        getApiData(req, res, query, offset)
    })
    
    app.get('/api/latest/imagesearch', (req, res) => {
        let collection = db.collection('queries')
        collection.find({}, {
            "_id": 0
        }).limit(10).toArray((err, data) => {
            if(err) throw err
            res.send(JSON.stringify(data))
        })
    })
}