import { React, Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Bands.scss';
import './BandsQueries.scss';
import { fetchAPI } from '../../../config/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Bands = () => {
  // Hook states
  const [bands, setBands] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterSort, setFilterSort] = useState('sort');
  const [display, setDisplay] = useState('bands-flex');

  // Sets document title and calls fn to get bands
  useEffect(() => {
    document.title = 'Bands APP - Bands';
    getBands();
  }, []);

  // Obtains bands from api
  const getBands = async () => {
    const resp = await fetchAPI('bands', {});
    setBands(resp.data);
  };

  // Input setters
  const setDisplayFlex = () => {
    setDisplay('bands-flex');
  };
  const setDisplayGrid = () => {
    setDisplay('bands-grid');
  };

  // Input change handlers
  const handleNameChange = (event) => setFilterName(event.target.value);
  const handleSortChange = (event) => setFilterSort(event.target.value);

  // Filter results
  const filterBands = () => {
    let filtered = bands.filter(({ name }) =>
      String(name).toLocaleLowerCase().includes(String(filterName).toLocaleLowerCase())
    );
    return filterSort !== 'sort'
      ? filtered.sort((a, b) => {
          return filterSort > 0 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        })
      : filtered;
  };

  return (
    <Fragment>
      <section className="bands-header">
        <h1>Bands</h1>
        <div className="filter-sorting">
          <Box>
            <TextField
              inputProps={{ style: { fontSize: 15, height: '20px', width: '300px' } }}
              InputLabelProps={{ style: { fontSize: 15, background: '#fff', paddingRight: '3px' } }}
              id="input-name"
              label="Band name"
              variant="outlined"
              value={filterName}
              onChange={handleNameChange}
            />
          </Box>
          <Box>
            <Select
              id="input-sort"
              sx={{
                width: 100,
                height: '20',
                fontSize: 15
              }}
              value={filterSort}
              label="Name"
              onChange={handleSortChange}>
              <MenuItem value={'sort'}>Order</MenuItem>
              <MenuItem value={'1'}>Asc</MenuItem>
              <MenuItem value={'-1'}>Desc</MenuItem>
            </Select>
          </Box>
        </div>
        <div className="display-buttons">
          <button
            className="btn-display"
            aria-label="display as list button"
            onClick={() => setDisplayFlex()}>
            <FormatListBulletedIcon type={FormatListBulletedIcon} />
          </button>
          <button
            className="btn-display"
            aria-label="display as grid button"
            onClick={() => setDisplayGrid()}>
            <GridViewIcon type={GridViewIcon} />
          </button>
        </div>
      </section>

      {bands.length ? (
        <div className="bands-container ">
          <div className="bands-filter"></div>
          <div className={`${display}`}>
            {bands.length
              ? filterBands().map((band) => (
                  <NavLink key={band.id} to={`/band/${band.id}/${band.name}`}>
                    <div className="bands-band" key={band.id}>
                      {band.name}
                    </div>
                  </NavLink>
                ))
              : null}
          </div>
        </div>
      ) : (
        <div className="bands-loader">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </Fragment>
  );
};

export default Bands;
