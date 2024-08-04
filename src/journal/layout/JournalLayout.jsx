import { Box, Toolbar } from '@mui/material'
import { NavBar, Sidebar } from '../components';


const drawereWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display:'flex' }}  className='animate__animated animate__fadeIn animate_faster'>

        <NavBar drawerWidth = {drawereWidth }/>

        <Sidebar drawerWidth= { drawereWidth } />

        <Box
            component="main"
            sx={{ flexFlow: 1, p:3 }}
        >
            <Toolbar />

            { children }

        </Box>
    </Box>
  )
}

export default JournalLayout
