import {BsExclamationTriangle, BsInfoCircle} from "react-icons/all";
import {Alert} from "react-bootstrap";

const variantMapping = {
  error: 'danger',
  warning: 'warning',
  info: 'info',
};

const logoMapping = {
  error: (<BsExclamationTriangle />),
  warning: (<BsExclamationTriangle />),
  info: (<BsInfoCircle />),
}

export interface SloganProps {
  variant: 'error' | 'warning' | 'info';
  children: string;
}

export default function Slogan(props: SloganProps): JSX.Element {
  const variant = variantMapping[props.variant];
  const logo = logoMapping[props.variant];

  return (
    <Alert variant={variant}>
      <span className="mr-1">{logo}</span>
      <span>
        {props.children}
      </span>
    </Alert>
  );
}
