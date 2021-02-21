import {Spinner} from 'react-bootstrap';

export default function Loading(): JSX.Element {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Spinner animation="border">
        <span className="sr-only">Loading</span>
      </Spinner>
    </div>
  );
}
