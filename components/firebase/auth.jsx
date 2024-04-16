import { SafeAreaView, Button, Text } from 'react-native';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInAnonymously, signInWithCredential, OAuthProvider, getAuth } from 'firebase/auth';
import {
    exchangeCodeAsync,
    makeRedirectUri,
    useAuthRequest,
    useAutoDiscovery,
} from 'expo-auth-session';

export const Auth = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
        await signInAnonymously(FIREBASE_AUTH);
    }
}

// export const AuthWithMicrosoft = () => {
//     const discovery = useAutoDiscovery(
//         'https://login.microsoftonline.com/ec031357-3725-440f-9fdb-a26dc534b598/v2.0',
//     );

//     const redirectUri = makeRedirectUri({
//         scheme: undefined,
//         path: 'auth',
//     });
//     const clientId = '79d77426-cab6-41d1-9541-a4e16367eb7e';

//     const [token, setToken] = useState(null);

//     const [request, , promptAsync] = useAuthRequest(
//         {
//             clientId,
//             scopes: ['openid', 'profile', 'email', 'offline_access'],
//             redirectUri,
//         },
//         discovery,
//     );

//     const handleLogin = async () => {
//         try {
//             const codeResponse = await promptAsync();
//             if (request && codeResponse?.type === 'success' && discovery) {
//                 const res = await exchangeCodeAsync(
//                     {
//                         clientId,
//                         code: codeResponse.params.code,
//                         extraParams: request.codeVerifier
//                             ? { code_verifier: request.codeVerifier }
//                             : undefined,
//                         redirectUri,
//                     },
//                     discovery,
//                 );

//                 setToken(res.accessToken);
//                 const provider = new OAuthProvider('microsoft.com');

//                 // Set the access token obtained from Microsoft
//                 const auth = getAuth();
//                 provider.addScope('email');
//                 provider.addScope('profile');
//                 provider.setCustomParameters({
//                     access_token: res.accessToken
//                 });

//                 const userCredentials = await signInWithCredential(FIREBASE_AUTH, provider);
//                 console.log(userCredentials.user);
//             }
//         } catch (error) {
//             console.error("Error during login:", error);
//         }
//     };

//     return (
//         <SafeAreaView>
//             <Button
//                 disabled={!request}
//                 title="Login"
//                 onPress={handleLogin}
//             />
//             <Text>{token}</Text>
//         </SafeAreaView>
//     );
// }