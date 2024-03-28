const DateStringParser = (date) => {
    if (date) {
        return date?.toDate().toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    } else {
        return null;
    }
}

export default DateStringParser;