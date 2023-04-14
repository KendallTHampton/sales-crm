import admin from "firebase-admin";
import {ServiceAccount} from "./serviceAccount.js";

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
});

const auth = admin.auth();
export {auth}
export default admin;