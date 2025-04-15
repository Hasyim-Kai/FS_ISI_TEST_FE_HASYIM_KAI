export const primaryGradient = 'bg-gradient-to-br from-blue-500 via-blue-700 to-blue-600 shadow-lg';
export function getRandomHexColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
}
