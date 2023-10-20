import { signInWithPopup } from "firebase/auth";
import { authGoogle, providerGithub } from "../Firebase";  // Atualize com o caminho correto para o seu arquivo de configuração Firebase

export const handleGithubLogin = async () => {
    try {
        const result = await signInWithPopup(authGoogle, providerGithub);
        const { user } = result;

        if (!user) return null;

        const { email: userEmail, displayName: userName, uid: firebaseUid } = user;
        return {
            id: firebaseUid,
            email: userEmail,
            name: userName
        };
    } catch (error) {
        console.error("Error during GitHub login:", error);
        return null;
    }
};
