const express = require('express');
const redis = require('redis');
const PORT = process.env.PORT || 8081;

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.set('visits', 0);


app.get('/', (req, res) =>{
    client.get('visits', (err, visits) => {
        res.send(`Number of visits is ${+visits}`);
        client.set('visits', +visits + 1);
    });
});

app.listen(PORT, ()=>{
    console.log(`The server is started at ${PORT}`);
});