export const arrayToRBG = (...args) => {
    return `rgb(${args.join(",")})`;
};

export const rgbToArray = (rgbColor) => {
    return rgbColor.match(/\d+/g);
};

export const blendColors = (...args) => {
    let base = [0, 0, 0, 0];
    let mix;
    let added;
    while ((added = args.shift())) {
        if (typeof added[3] === "undefined") {
            added[3] = 1;
        }
        // check if both alpha channels exist.
        if (base[3] && added[3]) {
            mix = [0, 0, 0, 0];
            // alpha
            mix[3] = 1 - (1 - added[3]) * (1 - base[3]);
            // red
            mix[0] = Math.round(
                (added[0] * added[3]) / mix[3] +
                (base[0] * base[3] * (1 - added[3])) / mix[3]
            );
            // green
            mix[1] = Math.round(
                (added[1] * added[3]) / mix[3] +
                (base[1] * base[3] * (1 - added[3])) / mix[3]
            );
            // blue
            mix[2] = Math.round(
                (added[2] * added[3]) / mix[3] +
                (base[2] * base[3] * (1 - added[3])) / mix[3]
            );
        } else if (added) {
            mix = added;
        } else {
            mix = base;
        }
        base = mix;
    }

    return mix;
};

export const addAlphaChannel = (rgb, opacity) => {
    return [...rgb, opacity];
};

export const createToneColor = (baseColor, toneColor, alpha) => {
    const rgbaColorArray = blendColors(
        addAlphaChannel(baseColor, 1),
        addAlphaChannel(toneColor, alpha)
    );

    return `rgb(${rgbaColorArray.splice(0, 3).join(",")})`;
};

export const rgbToHex = (r, g, b) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
