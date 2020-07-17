interface Pixel {
    x: number;
    y: number;
    color: string;
}

type PixelVector = Array<Pixel>

type PixelGrid = Array<PixelVector>

//
// Message-related types
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
        pixels: PixelGrid
    }
}

interface MsgUpdate {
    type: MsgType.Update;
    payload: PixelVector;
}

type WebSocketMessage = MsgInit | MsgUpdate;

export type {
    Pixel,
    PixelVector,
    PixelGrid,

    WebSocketMessage,
    MsgInit,
    MsgUpdate
}

export {
    MsgType
}
