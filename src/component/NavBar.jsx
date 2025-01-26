import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Trello } from 'lucide-react';

function Nav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Trello className="h-8 w-8" />
          <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1 }}>
            Trello
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Button component={Link} to="/boards" color="inherit" sx={{ '&:hover': { color: 'primary.light' } }}>
            Boards
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
