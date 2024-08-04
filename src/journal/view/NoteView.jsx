import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, DeleteOutlined, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { useForm } from '../../hooks/';
import { setActiveNote, startDeletiongNote, startSavingNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    
    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();

    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch(setActiveNote( formState ) );

    }, [formState])

    useEffect(() => {
      if( messageSaved.length > 0) {
        Swal.fire( 'Nota actualizada',messageSaved, 'success' );
      }

    }, [ messageSaved ])
    
    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0) return;
            dispatch( startUploadingFiles( target.files ));
            console.log('subiendo archivos')
        
    }

    const onDelete = () => {
        dispatch( startDeletiongNote() );
    }

  return (
    <Grid
        className='animate__animated animate__fadeIn animate_faster' 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx ={{ mb:1 }}> 

        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' > { dateString }</Typography>
        </Grid>

        <input 
            type="file" 
            multiple
            ref={ fileInputRef }
            onChange={ onFileInputChange }
            style={{ display:'none' }}
            ></input>
        
        <IconButton
            color="primary"
            disabled={ isSaving }
            onClick={() => fileInputRef.current.click()}
        >
            <UploadOutlined />

        </IconButton>

        <Grid item>
            <Button 
                disabled={ isSaving }
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding:2 }}>
                <SaveOutlined sx={{ fontSize:30, mr:1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingres un titulo"
                label='Título'
                sx={{ border: 'none', mb:1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedio?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            ></TextField>

        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick ={ onDelete }
                sx= {{color:'red'}}
                >
                <DeleteOutlined sx={{ fontSize:30, mr:1 }}/>
                Borrar
            </Button>

        </Grid>
        <ImageGallery images= { note.imageUrls }
        
        />
        
    </Grid>
  )
}

export default NoteView
