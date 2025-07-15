/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Optional for dark mode toggle
    theme: {
        extend: {
            colors: {
                primary: '#2563EB',
                secondary: '#1E40AF',
            },
            spacing: {
                '128': '32rem',
            },
        },
    },
    plugins: [],
}