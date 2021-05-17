import checkPropTypes from "check-prop-types";

export const findByTestAttribute = (component, attribute) => {
  const wrapper = component.find(`[data-test='${attribute}']`);
  return wrapper;
};
export const checkProps = (component, expectedProps) => {
  const propErrors = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propErrors;
};
