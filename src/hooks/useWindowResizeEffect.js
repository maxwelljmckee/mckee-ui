import React from "react";
import _debounce from "lodash/debounce";

export const useWindowResizeEffect = (
  callback,
  { delay = 200, id = "root" }
) => {
  // use toggle state to as an event trigger
  const [fireEvent, setFireEvent] = React.useState(false);

  // get DOM element width
  // root element will be used if no element id is provided
  const element = React.useMemo(() => document.getElementById(id) || {}, [id]);
  const width = element.offsetWidth || window.innerWidth;

  // fire event when DOM element is located
  React.useEffect(() => setFireEvent((prev) => !prev), [element]);

  // fire event on window resize
  window.onresize = _debounce(() => setFireEvent((prev) => !prev), delay);

  // memoize callback into returnable value
  const result = React.useMemo(
    () => callback(width),
    // eslint-disable-next-line
    [fireEvent]
  );

  // clear window resize event on component unmount
  React.useEffect(() => {
    return () => (window.onresize = null);
  }, []);

  return result;
};
