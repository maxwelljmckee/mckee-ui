import React from "react";
import {
  Dialog,
  DialogTitle,
  makeStyles,
  Slide,
  Divider,
  Box,
  IconButton,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { globalModalConfig } from "./globalModalConfig";

export const DialogWrapper = ({ id, ...props }) => {
  const classes = useStyles();
  const iconClasses = useIconStyles();
  const { Component, TransitionComponent, Icon, ...modal } =
    globalModalConfig[id];

  if (modal.override) {
    return (
      <Component
        fullWidth={modal.fullWidth}
        TransitionComponent={TransitionComponent || DefaultTransition}
        {...props}
      />
    );
  }

  return (
    <>
      <Dialog
        classes={classes}
        fullWidth={modal.fullWidth}
        TransitionComponent={DefaultTransition}
        {...props}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              {Icon ? <Icon classes={iconClasses} /> : null}
              {modal.title || "Enter title into modal config"}
            </Box>
            <IconButton onClick={props.onClose} size="small">
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <Component {...props} />
      </Dialog>
    </>
  );
};

const useStyles = makeStyles(() => ({
  paper: { minHeight: "250px" },
}));
const useIconStyles = makeStyles(() => ({
  root: { position: "relative", right: "6px" },
  colorPrimary: { color: "#bbb" },
}));

const DefaultTransition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
