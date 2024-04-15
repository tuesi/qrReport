import * as FileSystem from 'expo-file-system';

const ClearTemporaryDirectory = async (directoryPath, fileName) => {
    try {
        const files = await FileSystem.readDirectoryAsync(directoryPath);
        for (const file of files) {
            if (file !== fileName) {
                const filePath = `${directoryPath}/${file}`;
                await FileSystem.deleteAsync(filePath);
            }
        }
    } catch (error) {
        console.error('Error clearing directory:', error);
    }
}

export default ClearTemporaryDirectory;