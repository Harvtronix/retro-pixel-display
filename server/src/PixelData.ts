import PixelColors from './PixelColors'

const WIDTH = 40;
const HEIGHT = 20;

interface Pixel {
    x: number;
    y: number;
    color: string;
}

type AllPixelData = Array<Array<Pixel>>

const PixelData: AllPixelData = []

for (let i=0; i<WIDTH; i++) {
    const newCol: Array<Pixel> = []
    PixelData.push(newCol)

    for (let j=0; j<HEIGHT; j++) {
        newCol.push({
            x: i,
            y: j,
            color: PixelColors.CssColors.off
        })
    }
}

export default PixelData

export {
    WIDTH,
    HEIGHT
}

export type { Pixel, AllPixelData }
