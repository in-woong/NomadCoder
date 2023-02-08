import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Modal = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const Cover = styled.div`
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 400px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;

  position: relative;
  top: -80px;
`;

const Overview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};

  position: relative;
  top: -80px;
`;

const MovieModal = ({ bigMovieMatch, clickedMovie }: any) => {
  const navigate = useNavigate();

  const onOverlayClick = () => {
    navigate('/');
  };

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Modal layoutId={bigMovieMatch.params.movieId}>
        {clickedMovie && (
          <>
            <Cover
              style={{
                backgroundImage: `url(${makeImagePath(
                  clickedMovie.backdrop_path,
                  'w500'
                )}`,
              }}
            />
            <Title>{clickedMovie.title}</Title>
            <Overview>{clickedMovie.overview}</Overview>
          </>
        )}
      </Modal>
    </>
  );
};

export default MovieModal;
