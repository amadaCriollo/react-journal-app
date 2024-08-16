
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseBD } from '../../firebase/config';
import { addNewEmptyNotes, deleteNoteById, isSavingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers/';

export const startNewNote = () => {

    return async( dispatch, getState ) => {

        dispatch( isSavingNewNote() );

        const { uid } = getState( getState ).auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseBD, `/${ uid }/journal/notes`) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNotes( newNote ));
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = ( ) => {

    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error( 'El UID del usuario no existe' ); 
        
        const notes = await loadNotes( uid);

        dispatch( setNotes( notes ) );
        
    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = {...note};
        delete noteToFireStore.id;
        
        const docRef = doc( FirebaseBD, `${ uid }/journal/notes/${note.id}` );
        await setDoc( docRef, noteToFireStore, {  merge: true} );

        dispatch( updateNote( note ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for ( const file of files){
            fileUploadPromises.push( fileUpload( file ));  
        }
        console.log(fileUploadPromises)
        const photoUrls = await Promise.all( fileUploadPromises );
        
     
        dispatch( setPhotosToActiveNote( photoUrls )); 
    }
}

export const startDeletiongNote = () => {

    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const {  active:note } = getState().journal;
         
        const docRef = doc( FirebaseBD, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );
        dispatch( deleteNoteById( note.id ));

    }
    
}