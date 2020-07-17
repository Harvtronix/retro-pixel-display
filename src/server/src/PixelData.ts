import { CssColors } from './PixelColors'
import { PixelGrid, PixelVector } from './Interfaces';

/*
 * Pixel data is stored as a set of rows. The first index into the data is
 * effectively the 'y' coordinate in the grid. The second index into the data is
 * the 'x' coordinate in the grid.
 */

const WIDTH = 40;
const HEIGHT = 18;

const PixelData: PixelGrid = []

for (let row=0; row<HEIGHT; row++) {
    const newRow: PixelVector = []
    PixelData.push(newRow)

    for (let col=0; col<WIDTH; col++) {
        newRow.push({
            x: col,
            y: row,
            color: CssColors.off
        })
    }
}

export default PixelData

export {
    WIDTH,
    HEIGHT
}
