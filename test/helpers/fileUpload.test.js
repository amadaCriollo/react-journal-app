import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'udemyreact1',
    api_key:'539272465622869',
    api_secret: 'kB_rjenxWDcgiz6xhuq0AgFHEf0',
    secure: true
})

//cloudinary.v2.api.delete_resources(public_ids, options).then(callback);
describe('Pruebas en fileUpload', () => {
  
    test('Debe de subir el archivo correctamente a cloudinary ', async() => {
        const imageUrl = "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/9db5/live/48fd9010-c1c1-11ee-9519-97453607d43e.jpg";
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([ blob ], 'foto.jpg');

        const url = await fileUpload( file );
        expect ( typeof url ).toBe('string');

        //Eliminando imagen
        const segments = url.split('/');
        
        const imageId = segments[ segments.length -1 ].replace('.jpg','');
        const cloudResp = await cloudinary.api.delete_resources([ imageId ]);

    });

    test('Debe de retornar null', async() => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
        expect ( url ).toBe(null);
    });

})
