"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const PixelData_1 = __importStar(require("./PixelData"));
const PixelColors_1 = __importDefault(require("./PixelColors"));
const SERVER_PORT = process.env.PORT || 4000;
//
// Start up the server
//
const server = express_ws_1.default(express_1.default()).app;
server.ws('/websocket', handleWebsocketConnection);
server.listen(SERVER_PORT, () => {
    console.log(`\\{^_^}/ Websocket server is running on port ${SERVER_PORT}`);
});
//
// Server data and handlers
//
var MsgType;
(function (MsgType) {
    MsgType[MsgType["Init"] = 0] = "Init";
    MsgType[MsgType["Update"] = 1] = "Update";
})(MsgType || (MsgType = {}));
const connections = [];
function handleWebsocketConnection(webSocket, request) {
    console.log('websocket connected');
    connections.push(webSocket);
    const configMsg = {
        type: MsgType.Init,
        payload: {
            width: PixelData_1.WIDTH,
            height: PixelData_1.HEIGHT,
            pixels: PixelData_1.default
        }
    };
    webSocket.send(JSON.stringify(configMsg));
    webSocket.on('close', () => {
        const index = connections.indexOf(webSocket);
        connections.splice(index, 1);
    });
}
setInterval(() => {
    const pixel = PixelData_1.default[Math.floor(Math.random() * PixelData_1.WIDTH)][Math.floor(Math.random() * PixelData_1.HEIGHT)];
    pixel.color = PixelColors_1.default.rand();
    const msg = {
        type: MsgType.Update,
        payload: {
            x: pixel.x,
            y: pixel.y,
            pixel: pixel
        }
    };
    const msgText = JSON.stringify(msg);
    connections.forEach((connection) => {
        connection.send(msgText);
    });
}, 100);
exports.default = {};
