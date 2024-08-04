import { signInWithGoogle, registerUserWithEmailPassword, singInWithEmailAndPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoolgeSignIn = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
        const result = await signInWithGoogle();
        console.log({result});
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {

        dispatch(checkingAuthentication() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if( !ok ) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, displayName, email, photoURL }));
    }

}

export const startLoginWithEmailAndPawwsord = ({ email, password }) => {

    return async(dispatch) =>{
        
        dispatch( checkingAuthentication() );

        const { ok, uid, photoURL, displayName, errorMessage } = await singInWithEmailAndPassword({ email, password });

        if( !ok ) return dispatch( logout({ errorMessage }));

        dispatch( login( {uid, photoURL, displayName } ) );
        
    }
}

export const  startOnLogout = () => {

    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}