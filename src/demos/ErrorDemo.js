import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   console.log(error);
  //   return { hasError: true };
  // }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export const ErrorDemo = () => {
  return <Child condition />;
};

const Child = ({ condition }) => {
  let error;
  const { reportError } = useErrorHandling();
  const myPromise = () =>
    new Promise((resolve, reject) => reject("bad things happened"));

  myPromise()
    .then(() => console.log("good things happened"))
    .catch((err) => (error = err));

  React.useEffect(() => {
    if (error) reportError(error);
  });
  return (
    <div>
      <h2>Things</h2>
      <h2>and Stuff</h2>
      <h2>and Things</h2>
      <h2>and Stuff</h2>
    </div>
  );
};

const useErrorHandling = () => {
  const [error, setError] = React.useState(null);
  const reportError = (error) => setError(error);
  React.useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);
  return { reportError };
};
