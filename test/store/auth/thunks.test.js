import { logoutFirebase, registerUserWithEmailPassword, signInWithGoogle, singInWithEmailAndPassword } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoolgeSignIn, startLoginWithEmailAndPassword, startOnLogout } from '../../../src/store/auth';
import { checkingAuthentication } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );
  
    test('Debe de invocar el checkingCredentials  ', async() => {

      await checkingAuthentication()( dispatch );
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      
    });
    
    test('startGoolgeSignIn Debe de llamar checkingCredentials y login - Exito ', async() => {
      const loginData = { ok: true, ...demoUser };
      await signInWithGoogle.mockResolvedValue( loginData );

      // thunk
      await startGoolgeSignIn()( dispatch );

      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
      
    });

    test('startGoolgeSignIn Debe de llamar checkingCredentials y logout - Error ', async() => {

      const loginData = { ok: false, errorMessage: 'Un error en google' };
      await signInWithGoogle.mockResolvedValue( loginData );

      // thunk
      await startGoolgeSignIn()( dispatch );

      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
      
    });


    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - Exito ', async() => {
      const loginData = { ok: true, ...demoUser };
      const params = { email: demoUser.email, password: '123456' };

      await singInWithEmailAndPassword.mockResolvedValue( loginData );

      //thunk
      await startLoginWithEmailAndPassword( params )( dispatch );

      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y logout - Error ', async() => {
      const loginData = { ok: false, errorMessage:'Error firebase' };
      const params = { email: demoUser.email, password: '123456' };

      await singInWithEmailAndPassword.mockResolvedValue( loginData );

      //thunk
      await startLoginWithEmailAndPassword( params )( dispatch );

      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startOnLogout debe de llamar logoutFirebase, crearNotes, logout ', async() => {

      await startOnLogout()( dispatch );

      expect( logoutFirebase ).toHaveBeenCalled();
      expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
      expect( dispatch ).toHaveBeenCalledWith( logout() );

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y create - Exitoso ', async() => {

      const createdData = { ok: true, ...demoUser };
      const params = { email:demoUser.email, password: '123456', displayName: demoUser.displayName };

      await registerUserWithEmailPassword.mockResolvedValue( createdData );
      
      //Thunk
      await startCreatingUserWithEmailPassword( params )( dispatch );

      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( login( createdData ) );
    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y create - Error ', async() => {

      const createdData = { ok: false, errorMessage:'Error firebase' };
      const params = { email:demoUser.email, password: '123456', displayName: demoUser.displayName };

      await registerUserWithEmailPassword.mockResolvedValue( createdData );
      
      //Thunk
      await startCreatingUserWithEmailPassword( params )( dispatch );

      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( logout( createdData.errorMessage ) );
    });
    
    
    
    
})
