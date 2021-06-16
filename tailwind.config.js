const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
module.exports = {
    darkMode: "media",
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            cyanEU: "#009bb4",

            
            gray: colors.coolGray,
            red: colors.red,
            yellow: colors.amber,
            green: colors.emerald,
            blue: colors.blue,
            indigo: colors.indigo,
            purple: colors.violet,
            pink: colors.pink,


            // blueGray: colors.blueGray,
            // coolGray: colors.coolGray,
            // gray: colors.trueGray,
            // trueGray: colors.trueGray,
            // warmGray: colors.warmGray,
            // red: colors.red,
            // orange: colors.orange,
            // amber: colors.amber,
            // yellow: colors.yellow,
            // lime: colors.lime,
            // green: colors.green,
            // emerald: colors.emerald,
            // teal: colors.teal,
            // cyan: colors.cyan,
            // lightBlue: colors.lightBlue,
            // blue: colors.blue,
            // indigo: colors.indigo,
            // violet: colors.violet,
            // purple: colors.purple,
            // fuchsia: colors.fuchsia,
            // pink: colors.pink,
            // rose: colors.rose,
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/aspect-ratio'),
    ],
};
