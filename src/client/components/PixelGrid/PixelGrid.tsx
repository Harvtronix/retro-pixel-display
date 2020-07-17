import styles from './PixelGrid.module.scss'

import React, { useEffect, useState } from 'react'
import produce from 'immer'

import {
    WebSocketMessage,
    MsgType,
    PixelGrid as PixelGridType
} from '../../../server/src/Interfaces'

const PIXEL_PITCH = '5mm';

const PixelGrid = (): JSX.Element | null => {
    const [pixelData, setPixelData] = useState<PixelGridType | null>(null)
    const [webSocket, setWebsocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        const ws = new WebSocket(`ws://${location.hostname}:4000/websocket`)

        ws.onopen = () => {
            setWebsocket(ws)
        }

        ws.onmessage = (msgEvent) => {
            const msg: WebSocketMessage = JSON.parse(msgEvent.data)

            switch (msg.type) {
                case MsgType.Init:
                    setPixelData(msg.payload.pixels)
                    break
                case MsgType.Update:
                    setPixelData((prevState) => {
                        return produce(prevState, (draft) => {
                            if (draft !== null) {
                                msg.payload.forEach((ele) => {
                                    draft[ele.y][ele.x] = ele
                                })
                            }
                        })
                    })
                    break
            }
        }

        return () => {
            if (webSocket && webSocket.readyState === WebSocket.OPEN) {
                webSocket.close()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!pixelData) {
        return null
    }

    const containerStyles = {
        'gridTemplateColumns': pixelData[0].map(() => ('auto')).join(' '),
        'gridTemplateRows': pixelData.map(() => (`${100/pixelData.length}vh`)).join(' ')
    }

    const makePixelObjects = () => {
        return (
            pixelData.map((column, colIndex) => (
                column.map((pixel, rowIndex) => (
                    <div
                        key={`${colIndex},${rowIndex}`}
                        className={styles.Pixel}
                        style={{
                            backgroundColor: pixel.color,
                            width: PIXEL_PITCH,
                            height: PIXEL_PITCH
                        }}
                    />
                ))
            ))
        )
    }

    return (
        <div className={styles.Container} style={containerStyles}>
            {makePixelObjects()}
        </div>
    )
}

export default PixelGrid
