import { SaveImageToStorage, RemoveImageFromStorage } from "../components/firebase/storage";
import ImageFileNameGetter from "./imageFileNameGetter";

const SaveImage = async (image) => {
    if (image) {
        const fileName = ImageFileNameGetter(image);
        await SaveImageToStorage(image, fileName);
        return fileName;
    }
}

export default SaveImage;