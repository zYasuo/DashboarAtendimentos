import jwtDecode from 'jsonwebtoken/decode';
import { useRouter } from 'next/router';
import { api } from '../../InstanceApi/Api';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { authGoogle } from '../../../../services/Firebase/Firebase';
import CreateUseGoogle from '../../create/Google/CreateUseGoogle';

const useGoogleLogin = () => {
    const router = useRouter();
    const createUserInDb = CreateUseGoogle();

    const postUserToBackend = async (userDetails: { id: string; email: string | null; name: string | null; }) => {
        try {
            const response = await api.post('/UsuarioGoogle', userDetails);
            return response.data;
        } catch (error) {
            console.error("Error posting user to backend:", error);
            throw error;
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(authGoogle, provider);
            const { user } = result;

            if (!user) return;

            const { email: userEmail, displayName: userName, uid: firebaseUid } = user;
            const userDetails = {
                id: firebaseUid,
                email: userEmail,
                name: userName
            };

            const data = await postUserToBackend(userDetails);

            if (!data.success) {
                await createUserInDb(userDetails);
            }

            if (data.token) {
                localStorage.setItem('authToken', data.token);

                // Decodifique o token
                const decodedToken: any = jwtDecode(data.token);
                console.log(decodedToken); // Isso deve mostrar o conteúdo decodificado do token

                // Se o userId estiver incluído no token decodificado, você pode armazená-lo no localStorage também
                if (decodedToken.userId) {
                    localStorage.setItem('userId', decodedToken.userId.toString());
                }
            }

            router.push('/Dashboard');

        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return handleGoogleLogin;
};

export default useGoogleLogin;
