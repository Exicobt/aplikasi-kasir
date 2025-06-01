import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDT_g3GewrSz4D2CK5RQoTEHVlwimtMcLs",
    authDomain: "aplikasi-kasir-ded9e.firebaseapp.com",
    projectId: "aplikasi-kasir-ded9e",
    storageBucket: "aplikasi-kasir-ded9e.firebasestorage.app",
    messagingSenderId: "469373464177",
    appId: "1:469373464177:web:b706a31ed161ff3a2f75d0",
    measurementId: "G-Y27QHL13WL"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { storage }