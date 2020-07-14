"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CssColors = {
    red: 'rgb(255, 0, 0)',
    green: 'rgb(0, 255, 0)',
    blue: 'rgb(0, 0, 255)',
    yellow: 'rgb(255, 255, 0)',
    cyan: 'rgb(0, 255, 255)',
    magenga: 'rgb(255, 0, 255)',
    white: 'rgb(255, 255, 255)',
    off: 'rgb(10, 10, 10)'
};
const colorKeys = Object.keys(CssColors);
function rand() {
    const r = Math.floor(Math.random() * colorKeys.length);
    return CssColors[colorKeys[r]];
}
exports.default = {
    CssColors,
    rand
};
