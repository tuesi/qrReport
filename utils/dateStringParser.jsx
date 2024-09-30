const DateStringParser = (dateString) => {
    if (dateString) {
        // Parse the dateString
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            console.error('Invalid date string:', dateString);
            return null;
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    } else {
        return null;
    }
};

export default DateStringParser;