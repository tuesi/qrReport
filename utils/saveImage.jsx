import { SaveImageToStorage, RemoveImageFromStorage } from "../components/firebase/storage";
import ImageFileNameGetter from "./imageFileNameGetter";

const SaveImage = async (image) => {
    if (image) {
        const fileName = ImageFileNameGetter(image);
        await SaveImageToStorage(image, fileName);
        console.log(fileName);
        return fileName;
    }
}

const DeleteImage = async (image) => {
    if (image) {
        const fileName = ImageFileNameGetter(image);
        await RemoveImageFromStorage(image, fileName);
    }
}

export { SaveImage, DeleteImage };