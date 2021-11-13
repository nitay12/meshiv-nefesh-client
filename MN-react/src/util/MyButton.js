import React from "react";

import { Tooltip, IconButton } from "@material-ui/core";

export default ({ children, onClick, tip, btnClassName, tipClassName, placement }) => (
  <Tooltip title={tip} placement={placement} className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName}>
          {children}
      </IconButton>
  </Tooltip>
);
