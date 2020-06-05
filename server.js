require('dotenv').config();

const http = require('http');

const server = http.createServer((req,res) => {
    dateTimer()
        .then(()=> {
            console.log('Server stopped at '+ (new Date).toUTCString()); 
            server.close()
        })
})
const PORT = process.env.PORT || 5000;

server.listen(PORT)

const dateTimer = () => {
    
    return new Promise((res, rej) => {
        let timePerTwo = setInterval(() => console.log((new Date).toUTCString()), process.env.INTERVAL)
        
        setTimeout(() => {
            clearInterval(timePerTwo);
            res()
        }, process.env.TIME)
    })
}
