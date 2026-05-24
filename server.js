const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {

    let filePath = './public' + req.url

    if (req.url === '/') {
        filePath = './public/index.html'
    }

    const extname = path.extname(filePath)

    let contentType = 'text/html'

    switch (extname) {
        case '.css':
            contentType = 'text/css'
            break

        case '.js':
            contentType = 'text/javascript'
            break
    }

    fs.readFile(filePath, (err, content) => {

        if (err) {
            res.writeHead(404)
            res.end('Arquivo nao encontrado')
            return
        }

        res.writeHead(200, {
            'Content-Type': contentType
        })

        res.end(content, 'utf-8')
    })
})

const PORT = 3000

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})