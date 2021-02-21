import {Component, ReactNode} from 'react';
import {Alert, Card} from 'react-bootstrap';
import {BsBuilding, BsEnvelope, BsExclamationTriangle, BsGeo} from 'react-icons/all';

import api from '../data/api';
import {Owner, OwnerSocialMedia} from '../data/models';
import Loading from './Loading';
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
          <span className="mr-1"><BsEnvelope /></span>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </div>
      );
    }

    const badges: ReactNode[] = [];
    if (github) {
      badges.push(
        <span className="mr-1">
          <ShieldsIOGithubFollowersBadge user={github} style="social" />
        </span>
      )
    }

    if (telegram) {
      badges.push(
        <span className="mr-1">
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
            <h5 className="text-muted">{this.state.owner.nickname}</h5>
            <div className="mt-1">
              <div>
                <span className="mr-1"><BsBuilding /></span>
                {this.state.owner.organization}
              </div>
              <div>
                <span className="mr-1"><BsGeo /></span>
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
          <Alert variant="danger">
            <span className="mr-1"><BsExclamationTriangle /></span>
            Error loading owner info
          </Alert>
        </Card>
      )
    } else {
      return (
        <Card body>
          <Loading />
        </Card>
      );
    }
  }
}

export default OwnerCard;
