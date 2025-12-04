const http = require('http');
const url = require('url');

const server = http.createServer((req,res) =>{

    res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'})
    res.end('Hola desde Node.js')
})

const PORT = 3300;

server.listen(PORT, () =>{
    console.log('servidor HTTP escuchando en http://localhost:'+PORT)
})
