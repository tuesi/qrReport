import * as FileSystem from 'expo-file-system';

const SaveTemporaryFile = ({ svgRef, setFileUri }) => {
    svgRef.current.toDataURL(async (dataURL) => {
        const fileName = 'qrcode.png';
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.writeAsStringAsync(fileUri, dataURL, {
            encoding: FileSystem.EncodingType.Base64,
        });
        setFileUri(fileUri);
    });
}

export default SaveTemporaryFile;