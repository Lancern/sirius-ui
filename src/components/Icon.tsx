import {PropsWithChildren} from "react";

export default function Icon(props: PropsWithChildren<{}>): JSX.Element {
  return (
    <span className="mr-1">
      {props.children}
    </span>
  );
}
