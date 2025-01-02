import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const SearchBar = () => {
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,
                borderBottom: '1px solid #ccc',
            }}
            elevation={0}

        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search News Feeds"
                inputProps={{ 'aria-label': 'search news feeds' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchBar