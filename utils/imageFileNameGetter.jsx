const ImageFileNameGetter = (uri) => {
    if (uri) {
        return uri.split('/').pop();
    } else {
        return '';
    }
}

export default ImageFileNameGetter;