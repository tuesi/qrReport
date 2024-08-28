const GenerateSubString = (text) => {
    const lowerCaseText = text.toLowerCase();
    let substrings = [];
    for (let i = 0; i < lowerCaseText.length; i++) {
        for (let j = i + 3; j <= lowerCaseText.length; j += 3) {
            const substring = lowerCaseText.substring(i, j).trim();
            substrings.push(substring);
        }
    }
    return substrings;
}

export default GenerateSubString;