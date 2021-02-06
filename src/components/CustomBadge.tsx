import {PropsWithChildren} from 'react';

import {RGBColor} from '../utils/color';

const BadgeStyles = {
  height: '100%',
  borderRadius: '0.1rem',
  padding: '0.1rem',
};

interface CustomBadgeProps {
  backgroundColor?: RGBColor;
}

export default function CustomBadge(props: PropsWithChildren<CustomBadgeProps>): JSX.Element {
  const backgroundColor = props.backgroundColor ?? new RGBColor(0xf0, 0xf0, 0xf0);
  const backgroundColorGrayscale = backgroundColor.getGrayscale();
  const textColor = backgroundColorGrayscale < 0.5 ? '#ffffff' : '#000000';

  return (
    <span
        style={{
          ...BadgeStyles,
          backgroundColor: backgroundColor.toCSS(),
          color: textColor,
        }}>
      {props.children}
    </span>
  );
}
