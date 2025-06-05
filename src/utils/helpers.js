/**
 * Return a string with the first character capitalized.
 *
 * @param {string} s The string to capitalize
 * @return {string} The capitalized string
 */
export const capitalizeFirstLetter = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Return a string with all words capitalized.
 *
 * @param {string} s The string to capitalize all words
 * @return {string} The string with all words capitalized
 */
export const capitalizeAll = (s) => {
    if (typeof s !== 'string') return ''
    return s
        .split(' ')
        .map((word) => capitalizeFirstLetter(word))
        .join(' ')
}


/**
 * Return a string with the date and time in the format DD/MM/YYYY HH:MM:SS
 * 
 * @param {string} dateString The date string to format
 * @return {string} The formatted date string
 */
export const formatDateComplete = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};


/**
 * Return a string with the date in the format DD/MM/YYYY
 * 
 * @param {string} dateString The date string to format
 * @return {string} The formatted date string
 */
export const formatDateJour = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

/**
 * Return a string with the time in the format HH:MM:SS
 * 
 * @param {string} dateString The date string to format
 * @return {string} The formatted time string
 */
export const formatDateHeurs = (dateString) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Formats a time in seconds to a string in the format MM:SS.
 * 
 * @param {number} time - The time in seconds to format.
 * @return {string} The formatted time string.
 */
export const formatTime = (time) => {
    return `${Math.floor(time / 60) > 0 ? Math.floor( time/ 60) + 'min :' : ''} ${Math.floor(time) % 60} sec`;
}


/**
 * Formats a number to two decimal places.
 *
 * @param {number} number - The number to format.
 * @return {string} The formatted number as a string with two decimal places.
 * An empty string is returned if the input is not a number.
 */
export const formatNumber = (number) => {
    if (typeof number !== 'number') return ''
    return number.toFixed(2);
}