'use strict';

module.exports = (app, db) => {


const GoogleImages = require('google-images');

const client = new GoogleImages('002962581167205362641:hbbgdalzyts', 'AIzaSyDEmM3x95_WiwPS64iWY7dU7Cp5Q5cVMT8');

client.search('Steve Angello')
	.then(images => {
	    console.log('image: ', images)
// 		[{
// 			"url": "http://steveangello.com/boss.jpg",
// 			"type": "image/jpeg",
// 			"width": 1024,
// 			"height": 768,
// 			"size": 102451,
// 			"thumbnail": {
// 				"url": "http://steveangello.com/thumbnail.jpg",
// 				"width": 512,
// 				"height": 512
// 			}
// 		}]
// 		 */
	});

// paginate results
client.search('Steve Angello', {page: 2});

// search for certain size
client.search('Steve Angello', {size: 'large'});




    app.get('/api/imagesearch/*', (req, res) => {
        let query = req.params[0]
        let offset = req.query.offset
        client.search('Steve Angello').then(data => {
            res.send(data)
        })
        // res.send('Query: ' + query + ' Offset: ' + offset)
    })
    
    app.get('/api/latest/imagesearch/', (req, res) => {
        let query = req.params[0]
        let offset = req.query.offset
        res.send('Query: ' + query + ' Offset: ' + offset)
    })
}