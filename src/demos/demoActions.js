import { nodux } from "@no-dux/core";

const setBananas = () =>
  nodux.setItem("banana1.banana2.banana3", { bananas: "loads of bananas" });

const setPathArray = () =>
  nodux.setItem(["1", " 2", "3"], { a: "a", b: "b", c: "c" });

const setPayload = (payload) => nodux.setItem("payload", payload);

const removeFromPayload = () => nodux.removeItem("payload", "this");

const removeBananas = () => nodux.removeItem("banana1.banana2");

export const createDemoActions = () =>
  nodux.registerPartitionedActions("demoActions", {
    setBananas,
    setPathArray,
    setPayload,
    removeFromPayload,
    removeBananas,
  });
