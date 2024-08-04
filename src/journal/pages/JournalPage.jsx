
import { IconButton } from '@mui/material'
import JournalLayout from '../layout/JournalLayout'
import { NothingSelectedView } from '../view'
import { AddOutlined } from '@mui/icons-material'

export const JournalPage = () => {
  return (
    <JournalLayout>
{/* Dolore mollit amet anim duis aliquip eu id pariatur cillum. In cupidatat consequat pariatur sit proident amet ullamco mollit officia id aliquip veniam excepteur reprehenderit. Laborum veniam velit ea adipisicing. */}
      
      <NothingSelectedView />
     {/* <NoteView/> */}
     
      <IconButton
        size='large'
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity:0.9 },
          position:'fixed',
          right:50,
          bottom:50,
        }}
        >



          <AddOutlined sx= {{ fontSize:30 }}></AddOutlined>
      </IconButton>
     
   
    </JournalLayout>
  )
}

