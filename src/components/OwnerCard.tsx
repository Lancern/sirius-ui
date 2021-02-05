import {Component, ReactNode} from 'react';
import {Alert, Card, Spinner} from 'react-bootstrap';
import {BsBuilding, BsEnvelope, BsGeo} from 'react-icons/all';

import api from '../data/api';
import {Owner, OwnerSocialMedia} from '../data/models';
import {ShieldsIOGithubFollowersBadge, ShieldsIOTelegramUserBadge} from './ShieldsIO';

interface OwnerSocialMediaLinksProps {
  socialMedia: OwnerSocialMedia;
}

class OwnerSocialMediaLinks extends Component<OwnerSocialMediaLinksProps, any> {
  public constructor(props: OwnerSocialMediaLinksProps) {
    super(props);
  }

  private populateLinks(links: ReactNode[]) {
    const {socialMedia} = this.props;
    const {email, github, telegram} = socialMedia;

    if (email) {
      links.push(
        <div>
          <span style={{marginRight: '0.2rem'}}><BsEnvelope /></span>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </div>
      );
    }

    const badges: ReactNode[] = [];
    if (github) {
      badges.push(
        <span style={{marginRight: '0.5rem'}}>
          <ShieldsIOGithubFollowersBadge user={github} style="social" />
        </span>
      )
    }

    if (telegram) {
      badges.push(
        <span style={{marginRight: '0.5rem'}}>
          <ShieldsIOTelegramUserBadge user={telegram} style="social" />
        </span>
      )
    }

    if (badges.length > 0) {
      links.push(
        <div>
          {badges}
        </div>
      )
    }
  }

  public render(): ReactNode {
    const links: ReactNode[] = [];
    this.populateLinks(links);

    return (
      <div>
        {links}
      </div>
    );
  }
}

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
            <h3><b>{this.state.owner.name}</b></h3>
            <h5 style={{color: 'gray'}}>{this.state.owner.nickname}</h5>
            <div style={{marginTop: '1rem'}}>
              <div>
                <span style={{marginRight: '0.2rem'}}><BsBuilding /></span>
                {this.state.owner.organization}
              </div>
              <div>
                <span style={{marginRight: '0.2rem'}}><BsGeo /></span>
                {this.state.owner.location}
              </div>
              <OwnerSocialMediaLinks socialMedia={this.state.owner.socialMedia} />
            </div>
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
