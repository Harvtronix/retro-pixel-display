"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEIGHT = exports.WIDTH = void 0;
const PixelColors_1 = __importDefault(require("./PixelColors"));
const WIDTH = 40;
exports.WIDTH = WIDTH;
const HEIGHT = 20;
exports.HEIGHT = HEIGHT;
const PixelData = [];
for (let i = 0; i < WIDTH; i++) {
    const newCol = [];
    PixelData.push(newCol);
    for (let j = 0; j < HEIGHT; j++) {
        newCol.push({
            x: i,
            y: j,
            color: PixelColors_1.default.CssColors.off
        });
    }
}
exports.default = PixelData;
