import * as FileSystem from 'expo-file-system';
import CheckTemporaryDirectory from './checkTemporaryDirectory';
import ClearTemporaryDirectory from './clearTemporaryDirecotry';

const SaveTemporaryFile = async ({ svgRef, setFileUri, name }) => {
    const directoryPath = `${FileSystem.cacheDirectory}QRAPP/`;
    await CheckTemporaryDirectory(directoryPath);
    await ClearTemporaryDirectory(directoryPath);
    svgRef.current.toDataURL(async (dataURL) => {
        const fileName = 'QR_' + name + '.png';
        const fileUri = `${directoryPath}${fileName}`;
        await FileSystem.writeAsStringAsync(fileUri, dataURL, {
            encoding: FileSystem.EncodingType.Base64,
        });
        setFileUri(fileUri);
    });
}

export default SaveTemporaryFile;