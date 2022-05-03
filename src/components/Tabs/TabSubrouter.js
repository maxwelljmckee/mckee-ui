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

const useTabContainerStyles = makeStyles(() => ({}));

export const Tab = ({ ...props }) => {
  const classes = useTabStyles();
  return <MuiTab disableRipple classes={classes} {...props} />;
};

const useTabStyles = makeStyles(() => ({}));
