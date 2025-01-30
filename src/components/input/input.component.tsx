import type { FC, InputHTMLAttributes } from "react";

import { InputBase } from "./input.styles";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...otherProps
}) => {
     {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
  return <InputBase {...otherProps}>{children}</InputBase>;
};

export default Input;
