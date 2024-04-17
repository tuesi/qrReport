const GetInitials = (name) => {
    return name
        .split(' ')
        .map(part => part[0].toUpperCase())
        .slice(0, 3)
        .join('');
}

export default GetInitials;