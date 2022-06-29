const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const newspapers = [{
    name: 'The Times',
    address: 'https://www.thetimes.co.uk/environment/climate-change',
    base: 'https://www.thetimes.co.uk'
}

, {
    name: 'The Guardian',
    address: 'https://www.theguardian.com/environment/climate-crisis',
    base: 'https://www.theguardian.com'
}

, {
    name: 'CNN',
    address: 'https://www.cnn.com/specials/world/cnn-climate',
    base: 'https://www.cnn.com'
}
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = cheerio.load(response.data)
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
               const title = $(this).text()
                const url = $(this).attr('href')
            
                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })
        })
    })



app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.get('/news', (req, res) => {
    res.json(articles)
})




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    })
