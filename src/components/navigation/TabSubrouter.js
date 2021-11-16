import React from "react";
import { useParams, useHistory, Switch, Route } from "react-router-dom";
import { Tabs as MuiTabs, Tab as MuiTab, makeStyles } from "@material-ui/core";

export const TabSubrouter = ({ children, baseUrl, subroutes, ...props }) => {
  const { tab } = useParams();
  const history = useHistory();

  const handleChange = (e, nextTab) => {
    if (typeof props.onChange === "function") return props.onChange(nextTab);
    if (nextTab) {
      history.push(`${baseUrl}/${nextTab}`);
    } else {
      history.push(`${baseUrl}`);
    }
  };

  return (
    <>
      {typeof children === "function" ? (
        <>
          {children({ onChange: handleChange, value: tab || null, subroutes })}
        </>
      ) : (
        <Tabs
          value={tab || null}
          onChange={handleChange}
          subroutes={subroutes}
        />
      )}
      <Switch>
        {subroutes.map((route, i) => {
          const { path, label, ...routeRest } = route;
          return (
            <Route
              exact
              key={`tab-subroutes-${i}`}
              path={tab ? `${baseUrl}/${path}` : `${baseUrl}`}
              {...routeRest}
            />
          );
        })}
      </Switch>
    </>
  );
};

export const Tabs = ({ subroutes, ...props }) => {
  return (
    <TabsContainer {...props}>
      {subroutes.map((route, i) =>
        route.label ? (
          <Tab
            key={`tab-${i}`}
            value={route.path || null}
            label={route.label}
          />
        ) : null
      )}
    </TabsContainer>
  );
};

export const TabsContainer = ({ ...props }) => {
  const classes = useTabContainerStyles();
  return <MuiTabs classes={classes} variant="scrollable" {...props} />;
};

const useTabContainerStyles = makeStyles(({ palette }) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  root: {
    overflow: "visible",
  },
  flexContainer: {
    "& > button:last-of-type": {
      borderRight: `0.5px solid ${palette.border.grey}`,
    },
  },
  scroller: { overflow: "visible" },
}));

export const Tab = ({ ...props }) => {
  const classes = useTabStyles();
  return <MuiTab disableRipple classes={classes} {...props} />;
};

const useTabStyles = makeStyles(({ config, palette }) => ({
  root: {
    textTransform: "none",
    color: `${config.colors.cowbellBlue} !important`,
    "&:focus": {
      opacity: 1,
    },
    width: "11.5rem",
    fontWeight: "normal",
    overflow: "visible",
    borderLeft: `0.5px solid ${palette.border.grey}`,
    fontSize: config.textSizes.tertia,
  },
  selected: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: palette.background.paper,
    color: `${palette.primary.contrastText} !important`,
    borderRight: "none !important",
    borderLeft: "none !important",
    "&.Mui-selected": {
      color: `${palette.primary.contrastText} !important`,
      fontWeight: config.weights.bold,
    },
    "& + button": {
      borderLeft: "none !important",
    },
  },
}));
