import {Component, ReactNode} from 'react';

const ShieldsIOUrl = 'https://img.shields.io';

type ShieldsIOStyle = 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';

export interface ShieldsIOProps {
  badgeUrl: string;
  alt: string;
  style?: ShieldsIOStyle;
  logo?: string;
  linkUrl?: string;
}

class ShieldsIOBadge extends Component<ShieldsIOProps, any> {
  public constructor(props: ShieldsIOProps) {
    super(props);
  }

  private getBadgeUrl(): string {
    const url = new URL(this.props.badgeUrl);
    if (this.props.style) {
      url.searchParams.append('style', this.props.style);
    }
    if (this.props.logo) {
      url.searchParams.append('logo', this.props.logo);
    }

    return url.toString();
  }

  public render(): ReactNode {
    if (this.props.linkUrl) {
      return (
        <a href={this.props.linkUrl}>
          <img src={this.getBadgeUrl()} alt={this.props.alt} />
        </a>
      )
    } else {
      return (
        <img src={this.getBadgeUrl()} alt={this.props.alt} />
      )
    }
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

export class ShieldsIOCustomBadge extends Component<ShieldsIOCustomBadgeProps, any> {
  public constructor(props: ShieldsIOCustomBadgeProps) {
    super(props);
  }

  public render(): ReactNode {
    const {label, message, color, alt, style, logo, linkUrl} = this.props;
    return (
      <ShieldsIOBadge
          badgeUrl={`${ShieldsIOUrl}/badge/${label}-${message}-${color}`}
          alt={alt}
          style={style}
          logo={logo}
          linkUrl={linkUrl} />
    )
  }
}

export interface ShieldsIOGithubFollowersBadgeProps {
  user: string;
  alt?: string;
  label?: string;
  style?: ShieldsIOStyle;
}

export class ShieldsIOGithubFollowersBadge extends Component<ShieldsIOGithubFollowersBadgeProps, any> {
  public constructor(props: ShieldsIOGithubFollowersBadgeProps) {
    super(props);
  }

  private getGithubLink(): string {
    const {user} = this.props;
    return `https://github.com/${user}`;
  }

  public render(): ReactNode {
    const githubLink = this.getGithubLink();
    const {user, style} = this.props;
    const label = this.props.label ?? 'Follow';
    const alt = this.props.alt ?? `Follow ${this.props.user} on Github`;
    return (
      <ShieldsIOBadge
          badgeUrl={`${ShieldsIOUrl}/github/followers/${user}?label=${label}`}
          alt={alt}
          linkUrl={githubLink}
          style={style} />
    )
  }
}

export interface ShieldsIOGithubRepoStarsBadgeProps {
  user: string;
  repo: string;
  alt?: string;
  style?: ShieldsIOStyle;
}

export class ShieldsIOGithubRepoStarsBadge extends Component<ShieldsIOGithubRepoStarsBadgeProps, any> {
  public constructor(props: ShieldsIOGithubRepoStarsBadgeProps) {
    super(props);
  }

  private getGithubLink(): string {
    const {user, repo} = this.props;
    return `https://github.com/${user}/${repo}`;
  }

  public render(): ReactNode {
    const githubLink = this.getGithubLink();
    const {user, repo, style} = this.props;
    const alt = this.props.alt ?? `Star ${user}/${repo} on Github`;
    return (
      <ShieldsIOBadge
          badgeUrl={`${ShieldsIOUrl}/github/stars/${user}/${repo}`}
          linkUrl={githubLink}
          alt={alt}
          style={style} />
    )
  }
}

export interface ShieldsIOTelegramUserBadgeProps {
  user: string;
  color?: string;
  alt?: string;
  style?: ShieldsIOStyle;
}

export class ShieldsIOTelegramUserBadge extends Component<ShieldsIOTelegramUserBadgeProps, any> {
  public constructor(props: ShieldsIOTelegramUserBadgeProps) {
    super(props);
  }

  private getTelegramLink(): string {
    const {user} = this.props;
    return `https://t.me/${user}`;
  }

  public render(): ReactNode {
    const telegramLink = this.getTelegramLink();
    const {user, style} = this.props;
    const color = this.props.color ?? 'blue';
    const alt = this.props.alt ?? 'Telegram';
    return (
      <ShieldsIOCustomBadge
          label="telegram"
          message={user}
          color={color}
          alt={alt}
          linkUrl={telegramLink}
          style={style}
          logo="telegram" />
    )
  }
}
