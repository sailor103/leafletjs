const fs = require('fs')
const cheerio = require('cheerio')
const createHTML = require('create-html')
const htmlPath = './src/'


const demoList = []
fs.readdirSync(htmlPath).forEach(file => {
  const content = fs.readFileSync(htmlPath + file, "utf8")
  const $ = cheerio.load(content)
  demoList.push({
    url: htmlPath + file,
    title: $('title').text()
  })
})

const demoListHtml = demoList.reverse().map(i => `<li><a href="${i.url}" target="_blank">${i.title}</a></li>`).join('')

const html = createHTML({
  title: 'Leaflet 演示示例',
  body: `<ul>${demoListHtml}</ul>`
})

fs.writeFile('index.html', html, function (err) {
  if (err) console.log(err)
  console.log('generate index.html successfully!')
})
