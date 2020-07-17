import { ColorString } from "../PixelColors";
import { PixelGrid, PixelVector } from "../Interfaces";

function clear(color: ColorString, data: PixelGrid): PixelVector {
    const alteredPixels: PixelVector = []

    data.forEach((pixelVector) => {
        pixelVector.forEach((pixel) => {
            pixel.color = color
            alteredPixels.push(pixel)
        })
    })

    return alteredPixels
}

export default {
    clear
}
