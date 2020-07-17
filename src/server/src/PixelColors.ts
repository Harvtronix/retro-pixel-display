type ColorKey = keyof ColorDefs
type ColorString = string

interface ColorDefs {
    red: ColorString;
    green: ColorString;
    blue: ColorString;

    yellow: ColorString;
    cyan: ColorString;
    magenta: ColorString;

    white: ColorString;
    off: ColorString;
}

const CssColors: ColorDefs = {
    red: 'rgb(255, 0, 0)',
    green: 'rgb(0, 255, 0)',
    blue: 'rgb(0, 0, 255)',

    yellow: 'rgb(255, 255, 0)',
    cyan: 'rgb(0, 255, 255)',
    magenta: 'rgb(255, 0, 255)',

    white: 'rgb(255, 255, 255)',
    off: 'rgb(10, 10, 10)'
}

const colorKeys = Object.keys(CssColors) as Array<ColorKey>

function rand(): ColorString {
    let key: ColorKey;
    do {
        key = colorKeys[Math.floor(Math.random() * colorKeys.length)]
    } while (key === 'off')

    return CssColors[key]
}

export type {
    ColorKey,
    ColorString
}

export {
    CssColors
}

export default {
    rand
}
