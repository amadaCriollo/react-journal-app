import { signInWithGoogle, registerUserWithEmailPassword, singInWithEmailAndPassword, logoutFirebase } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoolgeSignIn = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {

        dispatch(checkingCredentials() );

        const result = await registerUserWithEmailPassword({ email, password, displayName });
        console.log(result)
        if( !result.ok ) return dispatch( logout( result.errorMessage ));

        dispatch( login( result ));
    }

}

export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async(dispatch) =>{
        
        dispatch( checkingCredentials() );

        const result = await singInWithEmailAndPassword({ email, password });
        console.log(result)
        if( !result.ok ) return dispatch( logout( result.errorMessage ));

        dispatch( login( result ) );
        
    }
}

export const  startOnLogout = () => {

    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}