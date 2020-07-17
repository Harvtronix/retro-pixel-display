import { PixelGrid, PixelVector } from "../Interfaces";
import { CssColors, ColorString } from "../PixelColors";
import { WIDTH, HEIGHT } from "../PixelData";

const smallNumbers: {[key: number]: any} = {
    0: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1]
    ],
    1: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    2: [
        [1, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1]
    ]
}

function drawDigitSmall(
    digit: number,
    color: ColorString,
    data: PixelGrid,
    x: number,
    y: number): PixelVector
{
    digit = Math.floor(digit)
    if (digit < 0 || digit > 9) {
        throw new Error('Digit must be from 0-9')
    }

    const targetDigit = smallNumbers[digit]
    const alteredPixels: PixelVector = []

    for (let row=0; row<targetDigit.length; row++) { // each row
        for (let col=0; col<targetDigit[row].length; col++) { // each col
            // bounds check
            if (y+row >= HEIGHT || x+col >= WIDTH ) {
                continue
            }

            // get the actual pixel
            const pixel = data[y+row][x+col]

            // update the pixel
            pixel.color = targetDigit[row][col]
                ? color
                : CssColors.off

            // mark the pixel as changed
            alteredPixels.push(pixel)
        }
    }

    return alteredPixels
}

export default {
    drawDigitSmall
}
