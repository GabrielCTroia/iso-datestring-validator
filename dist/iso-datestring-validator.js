"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param date YYYY-MM-DD
 * @param s separator symbol between years, months and days
 */
function isValidDate(date, s = "-") {
    const validator = new RegExp(`^(?!0{4}${s}0{2}${s}0{2})((?=[0-9]{4}${s}(((0[^2])|1[0-2])|02(?=${s}(([0-1][0-9])|2[0-8])))${s}[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))${s}02${s}29))([0-9]{4})${s}(?!((0[469])|11)${s}31)((0[1,3-9]|1[0-2])|(02(?!${s}3)))${s}([0-2][0-9]|3[0-1])$`);
    return validator.test(date);
}
exports.isValidDate = isValidDate;
;
/**
 *
 * @param date YYYY-MM
 * @param s separator between hours and minutes
 */
function isValidYearMonth(date, s = '-') {
    const validator = new RegExp(`^[0-9]{4}${s}(0(?=[^0])|1(?=[0-2]))[0-9]$`);
    return validator.test(date);
}
exports.isValidYearMonth = isValidYearMonth;
/**
 *
 * @param time hh:mm:ss (optional)
 * @param s separator between hours, minutes and optional seconds
 */
function isValidTime(time, s = ':') {
    const validator = new RegExp(`^([0-1]|2(?=([0-3])|4${s}00))[0-9]${s}[0-5][0-9](${s}([0-5]|6(?=0))[0-9])?(\.[0-9]{1,9})?$`);
    return validator.test(time);
}
exports.isValidTime = isValidTime;
function isValidISODateString(dateString) {
    const getStringSeparator = (datestr) => {
        const separator = /\D/.exec(datestr);
        return separator ? separator[0] : '';
    };
    const [date, timeWithOffset] = dateString.split('T');
    const dateSeparator = getStringSeparator(date);
    const isDateValid = isValidDate(date, dateSeparator);
    if (timeWithOffset.includes('Z')) {
        const time = timeWithOffset.replace('Z', '');
        return isDateValid && isValidTime(time, getStringSeparator(time));
    }
    const offsetZone = timeWithOffset.includes('+') ? true : false;
    const [time, offset] = timeWithOffset.split(/[+-]/);
    return isDateValid && isValidTime(time, getStringSeparator(time)) && isValidZoneOffset(offset, offsetZone, getStringSeparator(offset));
}
exports.isValidISODateString = isValidISODateString;
/**
 *
 * @param offset
 * @param isPositiveOffset the flag, which determines if the zone has positive or negative offset
 * 00:00 is considered a positive zone
 * @param s separator
 */
function isValidZoneOffset(offset, isPositiveOffset, s = ':') {
    const validator = new RegExp(isPositiveOffset ? `^(0(?!(2${s}4)|0${s}3)|1(?=([0-1]|2(?=${s}[04])|[34](?=${s}0))))([03469](?=${s}[03])|[17](?=${s}0)|2(?=${s}[04])|5(?=${s}[034])|8(?=${s}[04]))${s}([03](?=0)|4(?=5))[05]$` : `^(0(?=[^0])|1(?=[0-2]))([39](?=${s}[03])|[0-24-8](?=${s}00))${s}[03]0$`);
    return validator.test(offset);
}
exports.isValidZoneOffset = isValidZoneOffset;
