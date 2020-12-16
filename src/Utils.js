export const findNumber = (str) => {
    const numberPattern = /\d+/g;
    return str.match(numberPattern) ? parseInt(str.match(numberPattern)[0]) : 1;
};
