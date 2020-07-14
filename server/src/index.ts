import express  from 'express'
import expressWs from 'express-ws'
import ws from 'ws'
import PixelData, {WIDTH, HEIGHT, Pixel, AllPixelData} from './PixelData'
import PixelColors from './PixelColors'

const SERVER_PORT = process.env.PORT || 4000

//
// Start up the server
//

const server = expressWs(express()).app
server.ws('/websocket', handleWebsocketConnection)
server.listen(SERVER_PORT, () => {
    console.log(`\\{^_^}/ Websocket server is running on port ${SERVER_PORT}`)
})

//
// Server data and handlers
//

enum MsgType {
    Init,
    Update
}

interface MsgInit {
    type: MsgType.Init;
    payload: {
        width: number,
        height: number,
        pixels: AllPixelData
    }
}

interface MsgUpdate {
    type: MsgType.Update;
    payload: {
        x: number;
        y: number;
        pixel: Pixel;
    };
}

type WebSocketMessage = MsgInit | MsgUpdate;

const connections: Array<ws> = []

function handleWebsocketConnection(webSocket: ws, request: express.Request) {
    console.log('websocket connected')

    connections.push(webSocket)

    const configMsg: MsgInit = {
        type: MsgType.Init,
        payload: {
            width: WIDTH,
            height: HEIGHT,
            pixels: PixelData
        }
    }
    webSocket.send(JSON.stringify(configMsg))

    webSocket.on('close', () => {
        const index = connections.indexOf(webSocket)
        connections.splice(index, 1)
    })
}

setInterval(() => {
    const pixel = PixelData[Math.floor(Math.random()*WIDTH)][Math.floor(Math.random()*HEIGHT)]
    pixel.color = PixelColors.rand()

    const msg: MsgUpdate = {
        type: MsgType.Update,
        payload: {
            x: pixel.x,
            y: pixel.y,
            pixel: pixel
        }
    }
    const msgText = JSON.stringify(msg)

    connections.forEach((connection) => {
        connection.send(msgText)
    })
}, 100)

export default {}
