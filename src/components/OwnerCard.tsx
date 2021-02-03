import {Component, ReactNode} from 'react';
import {Alert, Card, Spinner} from 'react-bootstrap';

import {Owner} from '../data/models';
import api from '../data/api';

interface OwnerCardState {
  owner?: Owner;
  err?: any;
}

class OwnerCard extends Component<any, OwnerCardState> {
  public constructor(prop: any) {
    super(prop);
    this.state = {};
  }

  public componentDidMount() {
    api.getOwnerInfo()
        .then(owner => this.setState({owner}),
            err => {
              console.error('Error loading owner info: ' + err);
              this.setState({err})
            });
  }

  public render(): ReactNode {
    if (this.state.owner) {
      return (
        <Card>
          <Card.Img variant="top" src={this.state.owner.avatarUrl} />
          <Card.Body>
            <h3>{this.state.owner.name}</h3>
            <h5 style={{color: 'gray'}}>{this.state.owner.nickname}</h5>
            <div><span style={{color: 'gray'}}>{this.state.owner.organization}</span></div>
          </Card.Body>
        </Card>
      );
    } else if (this.state.err) {
      return (
        <Card body>
          <Alert variant="danger">Error loading owner info</Alert>
        </Card>
      )
    } else {
      return (
        <Card body>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading</span>
            </Spinner>
          </div>
        </Card>
      );
    }
  }
}

export default OwnerCard;
