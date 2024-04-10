const DateStringParser = (dateString) => {
    if (dateString) {
        const date = typeof dateString === 'object' && typeof dateString.toDate === 'function'
            ? dateString.toDate() : dateString;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    } else {
        return null;
    }
}

export default DateStringParser;