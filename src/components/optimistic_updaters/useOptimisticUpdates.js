import React from "react";
import _set from "lodash/set";
import _isEmpty from "lodash/isEmpty";

export const useOptimisticUpdates = ({
  data = {},
  onUpdate = () => null,
  onSuccess = () => null,
  onFailure = () => null,
}) => {
  const [currentState, setCurrentState] = React.useState(data);
  const [optimisticUpdate, setOptimisticUpdate] = React.useState(data);

  // realign internal state when data is modified from outside
  React.useEffect(() => {
    if (!_isEmpty(data)) {
      setCurrentState(data);
      setOptimisticUpdate(data);
    }
  }, [data]);

  const _onUpdate = React.useCallback(
    (path, update) => {
      setOptimisticUpdate((prev) => {
        const nextState = _set(prev, path, update);
        return { ...nextState };
      });
      onUpdate();
    },
    [onUpdate]
  );

  const _onSuccess = React.useCallback(() => {
    setCurrentState(optimisticUpdate);
    onSuccess();
  }, [onSuccess, optimisticUpdate]);

  const _onFailure = React.useCallback(() => {
    setOptimisticUpdate(currentState);
    onFailure();
  }, [currentState, onFailure]);

  return {
    onUpdate: _onUpdate,
    onFailure: _onFailure,
    onSuccess: _onSuccess,
    data: optimisticUpdate,
  };
};
