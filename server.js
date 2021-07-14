require('dotenv').config()
const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const cookieParser= require('cookie-parser')

const SocketServer = require('./socketServer')
const {ExpressPeerServer} = require('peer')
const path= require('path')

const app= express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Socket
const http = require('http')
const server= http.createServer(app)
const { Server} = require('socket.io')
const io = new Server(server)

io.on('connection', socket=>{
    console.log(socket.id)
    SocketServer(socket)
})

// Create peer server
// ExpressPeerServer(http, {path:'/'})

// Routes
app.get('/', (req, res)=>{
    res.json({msg: 'hello'})
})
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/notifyRouter'))

// Connect to MongoDB
const URI= process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true, 
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=>{
    if(err) throw err;
    console.log('Connected to MongoDB!')
})


const port = process.env.PORT||5000
server.listen(port, ()=>{
    console.log(
        'Server is running on port', port
    )
})