import * as FileSystem from 'expo-file-system';
import CheckTemporaryDirectory from './checkTemporaryDirectory';
import ClearTemporaryDirectory from './clearTemporaryDirecotry';

const SaveTemporaryFile = async ({ svgRef, setFileUri, name }) => {
    const directoryPath = `${FileSystem.cacheDirectory}QRAPP/`;
    const fileName = 'QR_' + name + '.png';
    const fileUri = `${directoryPath}${fileName}`;
    await CheckTemporaryDirectory(directoryPath);
    await ClearTemporaryDirectory(directoryPath, fileName);
    await svgRef.current.toDataURL(async (dataURL) => {
        await FileSystem.writeAsStringAsync(fileUri, dataURL, {
            encoding: FileSystem.EncodingType.Base64,
        });
        setFileUri(fileUri);
    });
}

export default SaveTemporaryFile;