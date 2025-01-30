import type { FC, ReactNode } from "react";

import { DialogBoxContainer, DialogBoxChildren } from "./dialog-box.styles";

type DialogBoxProps = {
  children: ReactNode;
};

const DialogBox: FC<DialogBoxProps> = ({ children }) => {
  return (
    <DialogBoxContainer>
      <div>&gt;</div>
         {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DialogBoxChildren>{children}</DialogBoxChildren>
    </DialogBoxContainer>
  );
};

export default DialogBox;
