import {useEffect, useState} from 'react';
import {Alert, Card} from 'react-bootstrap';
import {BsBuilding, BsEnvelope, BsExclamationTriangle, BsGeo} from 'react-icons/all';

import {useApi} from '../context/api';
import {Owner, OwnerSocialMedia} from '../data/models';
import Loading from './Loading';
import {ShieldsIOGithubFollowersBadge, ShieldsIOTelegramUserBadge} from './ShieldsIO';

export interface OwnerSocialMediaLinksProps {
  socialMedia: OwnerSocialMedia;
}

function OwnerSocialMediaLinks(props: OwnerSocialMediaLinksProps): JSX.Element {
  const links: JSX.Element[] = [];

  const {socialMedia} = props;
  const {email, github, telegram} = socialMedia;

  if (email) {
    links.push(
      <div key="email">
        <span className="mr-1"><BsEnvelope /></span>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </div>
    );
  }

  const badges: JSX.Element[] = [];
  if (github) {
    badges.push(
      <span key="github" className="mr-1">
        <ShieldsIOGithubFollowersBadge user={github} style="social" />
      </span>
    );
  }

  if (telegram) {
    badges.push(
      <span key="telegram" className="mr-1">
        <ShieldsIOTelegramUserBadge user={telegram} style="social" />
      </span>
    );
  }

  if (badges.length > 0) {
    links.push(
      <div key="badges">
        {badges}
      </div>
    );
  }

  return (
    <div>
      {links}
    </div>
  );
}

export default function OwnerCard(): JSX.Element {
  const [owner, setOwner] = useState<Owner>();
  const [err, setErr] = useState<any>();
  const apiContext = useApi();

  useEffect(() => {
    apiContext.sirius.getOwnerInfo()
        .then(owner => setOwner(owner),
            err => {
              console.error('Error loading owner info: ' + err);
              setErr(err);
            });
  }, []);

  if (owner) {
    return (
      <Card>
        <Card.Img variant="top" src={owner.avatarUrl} />
        <Card.Body>
          <h3><b>{owner.name}</b></h3>
          <h5 className="text-muted">{owner.nickname}</h5>
          <div className="mt-1">
            <div>
              <span className="mr-1"><BsBuilding /></span>
              {owner.organization}
            </div>
            <div>
              <span className="mr-1"><BsGeo /></span>
              {owner.location}
            </div>
            <OwnerSocialMediaLinks socialMedia={owner.socialMedia} />
          </div>
        </Card.Body>
      </Card>
    );
  } else if (err) {
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
