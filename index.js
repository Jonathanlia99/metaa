
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');
const db = require('./database/dbConfig.js');

const app = express();
const server = require('http').createServer(app);

const io = socketIo(server);

app.use(bodyParser.json());
app.use(morgan('tiny'));

// Synchronize database
db.sync().catch((err) => {
    if (err) {
        console.log('Gagal syncronus database...', err.stack)
    }
})

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));


io.on('connection', socket => {

    let countdown = { minutes: 2, seconds: 0 };
    const totalSeconds = countdown.minutes * 60 + countdown.seconds;

    const countdownInterval = setInterval(() => {
        if (totalSeconds > 0) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            io.emit('timer', { minutes, seconds });
            totalSeconds--;
        } else {
            clearInterval(countdownInterval);
        }
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(countdownInterval);
        console.log('Client disconnected');
    });
});

// Routes
app.use('/users', require("./routes/users_route.js"));


app.use('/public/images', express.static(path.join(__dirname, './public/images/')));


app.use((req, res, next) => {
    res.status(404).json('Lo sentimos, esta página no se pudo encontrar.')
})
// Start server
server.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('Server gagal terhubung...', err.stack);
    } else {
        console.log(`Server berhasil terhubung dengan port ${process.env.PORT}`);
    }
});


