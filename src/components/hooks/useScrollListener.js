import React from "react";
import _debounce from "lodash/debounce";

export const useScrollListener = () => {
  const [scroll, setScroll] = React.useState(0);
  React.useEffect(() => {
    window.onscroll = _debounce(() => setScroll(window.scrollY), 500);
    return () => (window.onscroll = null);
  }, []);
  window.scrollY = scroll;
  return scroll;
};
