const ShieldsIOUrl = 'https://img.shields.io';

type ShieldsIOStyle = 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';

export interface ShieldsIOProps {
  badgeUrl: string;
  alt: string;
  style?: ShieldsIOStyle;
  logo?: string;
  linkUrl?: string;
}

export function ShieldsIOBadge(props: ShieldsIOProps): JSX.Element {
  const getBadgeUrl = () => {
    const url = new URL(props.badgeUrl);
    if (props.style) {
      url.searchParams.append('style', props.style);
    }
    if (props.logo) {
      url.searchParams.append('logo', props.logo);
    }

    return url.toString();
  };

  if (props.linkUrl) {
    return (
      <a href={props.linkUrl}>
        <img src={getBadgeUrl()} alt={props.alt} />
      </a>
    );
  } else {
    return (
      <img src={getBadgeUrl()} alt={props.alt} />
    );
  }
}

export interface ShieldsIOCustomBadgeProps {
  label: string;
  message: string;
  color: string;
  alt: string;
  style?: ShieldsIOStyle;
  logo?: string;
  linkUrl?: string;
}

export function ShieldsIOCustomBadge(props: ShieldsIOCustomBadgeProps): JSX.Element {
  const {label, message, color, alt, style, logo, linkUrl} = props;
  return (
    <ShieldsIOBadge
        badgeUrl={`${ShieldsIOUrl}/badge/${label}-${message}-${color}`}
        alt={alt}
        style={style}
        logo={logo}
        linkUrl={linkUrl} />
  );
}

export interface ShieldsIOGithubFollowersBadgeProps {
  user: string;
  alt?: string;
  label?: string;
  style?: ShieldsIOStyle;
}

export function ShieldsIOGithubFollowersBadge(props: ShieldsIOGithubFollowersBadgeProps): JSX.Element {
  const getGithubLink = () => {
    const {user} = props;
    return `https://github.com/${user}`;
  };

  const githubLink = getGithubLink();
  const {user, style} = props;
  const label = props.label ?? 'Follow';
  const alt = props.alt ?? `Follow ${props.user} on Github`;
  return (
    <ShieldsIOBadge
        badgeUrl={`${ShieldsIOUrl}/github/followers/${user}?label=${label}`}
        alt={alt}
        linkUrl={githubLink}
        style={style} />
  );
}

export interface ShieldsIOGithubRepoStarsBadgeProps {
  user: string;
  repo: string;
  alt?: string;
  style?: ShieldsIOStyle;
}

export function ShieldsIOGithubRepoStarsBadge(props: ShieldsIOGithubRepoStarsBadgeProps): JSX.Element {
  const getGithubLink = () => {
    const {user, repo} = props;
    return `https://github.com/${user}/${repo}`;
  };

  const githubLink = getGithubLink();
  const {user, repo, style} = props;
  const alt = props.alt ?? `Star ${user}/${repo} on Github`;
  return (
    <ShieldsIOBadge
        badgeUrl={`${ShieldsIOUrl}/github/stars/${user}/${repo}`}
        linkUrl={githubLink}
        alt={alt}
        style={style} />
  );
}

export interface ShieldsIOTelegramUserBadgeProps {
  user: string;
  color?: string;
  alt?: string;
  style?: ShieldsIOStyle;
}

export function ShieldsIOTelegramUserBadge(props: ShieldsIOTelegramUserBadgeProps): JSX.Element {
  const getTelegramLink = () => {
    const {user} = props;
    return `https://t.me/${user}`;
  };

  const telegramLink = getTelegramLink();
  const {user, style} = props;
  const color = props.color ?? 'blue';
  const alt = props.alt ?? 'Telegram';
  return (
    <ShieldsIOCustomBadge
        label="telegram"
        message={user}
        color={color}
        alt={alt}
        linkUrl={telegramLink}
        style={style}
        logo="telegram" />
  );
}
