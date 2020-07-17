import express  from 'express'
import expressWs from 'express-ws'
import ws from 'ws'
import PixelData, {WIDTH, HEIGHT} from './PixelData'
import PixelColors, { CssColors } from './PixelColors'
import {MsgInit, MsgType, MsgUpdate} from './Interfaces'
import PixelNumbers from './PixelLib/PixelNumbers'
import PixelFills from './PixelLib/PixelFills'

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

    webSocket.on('close', () => (doCleanup(webSocket)))
}

function doCleanup(webSocket: ws) {
    const index = connections.indexOf(webSocket)
    connections.splice(index, 1)
}

let x = 0

setInterval(() => {
    // const digit = Math.round(Math.random()*2)
    // const randX = Math.floor(Math.random()*WIDTH)
    // const randY = Math.floor(Math.random()*HEIGHT)
    const randColor = PixelColors.rand()

    let alteredPixels = PixelFills.clear(CssColors.off, PixelData)

    alteredPixels = alteredPixels.concat(
        PixelNumbers.drawDigitSmall(
            2,
            randColor,
            PixelData,
            ++x%WIDTH,
            0
        )
    )

    const msg: MsgUpdate = {
        type: MsgType.Update,
        payload: alteredPixels
    }
    const msgText = JSON.stringify(msg)

    connections.forEach((connection) => {
        try {
            connection.send(msgText)
        } catch (e) {
            console.error('Failed to send message to websocket' + connection)
            console.error(e)

            doCleanup(connection)
        }
    })
}, 40)

export default {}
