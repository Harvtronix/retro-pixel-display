import styles from './PixelGrid.module.scss'

import React, { useEffect, useState } from 'react'
import produce from 'immer'

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

interface Pixel {
    x: number;
    y: number;
    color: string;
}

type AllPixelData = Array<Array<Pixel>>

const PIXEL_PITCH = '5mm';

const PixelGrid = (): JSX.Element | null => {
    const [pixelData, setPixelData] = useState<AllPixelData | null>(null)
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
                                draft[msg.payload.x][msg.payload.y] = msg.payload.pixel
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
        'gridTemplateColumns': pixelData.map(() => ('auto')).join(' '),
        'gridTemplateRows': pixelData[0].map(() => (`${100/pixelData[0].length}vh`)).join(' ')
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
