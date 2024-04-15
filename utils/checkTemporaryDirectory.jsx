import * as FileSystem from 'expo-file-system';

const CheckTemporaryDirectory = async (directoryPath) => {
    const dirInfo = await FileSystem.getInfoAsync(directoryPath)
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
    }
}

export default CheckTemporaryDirectory;