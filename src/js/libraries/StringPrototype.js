/**
 * Source: http://stackoverflow.com/a/1026087/710630
 * @returns {string}
 */
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
