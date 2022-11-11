import { React, Fragment, useEffect, useState } from 'react';
import './Band.scss';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAPI } from '../../../config/api';

const Band = () => {
  // Hook states
  let [id] = useState(useParams().id || '');
  let [name] = useState(useParams().name || '');
  const [band, setBand] = useState(null);
  const [albums, setAlbums] = useState([]);

  // Sets document title and calls fn to get band
  useEffect(() => {
    document.title = `Bands APP - ${name}`;
    getBand();
  }, []);

  // Obtains band and albums from api
  const getBand = async () => {
    const bandProm = fetchAPI('bands', { id }).then((resp) => {
      const [data] = resp.data || null;
      if (data) setBand(data);
    });
    const albumProm = fetchAPI('albums', { bandId: id }).then((resp) => {
      const data = resp.data || null;
      if (data) setAlbums(data);
    });

    await Promise.all([bandProm, albumProm]);
  };

  return (
    <Fragment>
      <section className="band-header">
        <h1>{name}</h1>
      </section>
      {band !== null ? (
        <section>
          <div className="band-card">
            <span>
              Genre<h2>{band.genreCode}</h2>
            </span>
            <span>
              Country<h2>{band.country}</h2>
            </span>
            <span>
              Year<h2>{band.year}</h2>
            </span>
            <span>
              Members
              <ul>
                {band.members &&
                  band.members.map((member, idx) => <li key={idx}>{member.name}</li>)}
              </ul>
            </span>
            {albums.length ? (
              <span>
                Albums
                <ul>
                  {albums.map((alb, idx) => (
                    <li key={idx}>
                      {alb.year} &mdash; {alb.name}
                    </li>
                  ))}
                </ul>
              </span>
            ) : null}
          </div>
        </section>
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

export default Band;
