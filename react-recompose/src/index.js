import React from "react";
import { render } from "react-dom";
import { isClassComponent } from "recompose";
import "./index.css";

function createEagerFactory(Component) {
  return (props, children) => {
    if (isReferentiallyTransparentFunctionComponent(Component)) {
      return children ? Component({ ...props, ...children }) : Component(props);
    }
    return children ? (
      <Component {...props}>{children}</Component>
    ) : (
      <Component {...props} />
    );
  };
}
const overrideProps = overrideProps => BaseComponent => {
  const factory = createEagerFactory(BaseComponent);
  return props => factory({ ...props, ...overrideProps }, props.children);
};

function isReferentiallyTransparentFunctionComponent(Component) {
  return Boolean(
    typeof Component === "function" &&
      !isClassComponent(Component) &&
      !Component.defaultProps &&
      !Component.contextTypes &&
      (window.process.env.NODE_ENV === "production" || !Component.propTypes)
  );
}

const User = ({ name }) => <div>{name}</div>;
const App = () => (
  <div>
    <User name={"Joe"} />
  </div>
);

render(<App />, document.getElementById("root"));
