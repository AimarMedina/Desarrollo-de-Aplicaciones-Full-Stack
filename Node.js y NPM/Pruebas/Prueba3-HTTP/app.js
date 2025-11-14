const http = require('http');
const url = require('url');

const server = http.createServer((req,res) =>{
    const parsedUrl = url.parse(req.url,true)
    const name = parsedUrl.query.name || 'desconocido';

    res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'})
    res.end('Hola, '+ name+'!')
})

const PORT = 3000;

server.listen(PORT, () =>{
    console.log('servidor HTTP escuchando en http://localhost:'+PORT)
})
