export const getCoordinatesOnCircle = ({ center, radius, angle, }) => {
    const [x, y] = center;
    const xPosition = x + radius * Math.cos(degreesToRadians(angle));
    const yPosition = y + radius * Math.sin(degreesToRadians(angle));
    return [xPosition, yPosition];
};
export const degreesToRadians = (degrees) => {
    const pi = Math.PI;
    return degrees * (pi / 180);
};
