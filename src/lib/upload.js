// /lib/upload.js
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase" // pastikan ini udah di-setup

export const uploadImageAndGetURL = async (file) => {
    const fileRef = ref(storage, `menu-images/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    console.log(url)
    return url;
};
