import { SaveImageToStorage, RemoveImageFromStorage } from "../components/firebase/storage";
import ImageFileNameGetter from "./imageFileNameGetter";

const SaveImage = async (image) => {
    const fileName = ImageFileNameGetter(image);
    await SaveImageToStorage(image, fileName);
}

export default SaveImage;