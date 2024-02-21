import Spinner from 'react-bootstrap/Spinner';

const Loader=()=> {
  return (
    <Spinner animation="border" role="status" align="center" size='xl'>
      <span className="visually-hidden"></span>
    </Spinner>
  );
}

export default Loader;