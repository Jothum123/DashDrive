/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    green: "#00ff90",
                },
                zinc: {
                    950: "#09090b",
                }
            },
        },
    },
    plugins: [],
}
