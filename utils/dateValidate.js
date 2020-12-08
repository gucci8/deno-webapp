const dateValidate = (day, month, year) => {
    let maxdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 === 0) {
        maxdays[1] = 29;
    }

    if (day > maxdays[month - 1]) {
        return null;
    } else {
        if (month < 10 && day < 10) {
            return `${year}-0${month}-0${day}`;
        } else if (month < 10) {
            return `${year}-0${month}-${day}`;
        } else if (day < 10) {
            return `${year}-${month}-0${day}`;
        } else {
            return `${year}-${month}-${day}`;
        }
    }
}

export { dateValidate };