import React, { Component } from "react";
import RegisterForm from "./components/RegisterForm";

class RegisterFormContainer extends Component {
  submit = values =>
    alert(
      "You ve just submitted your awesome form" +
        JSON.stringify(values, null, 4)
    );

  getInitialValues = () => {
    return {
      preference: "tabs",
      name: "Yaryna",
      newsletter: true
    };
  };
  render() {
    return (
      <RegisterForm
        onSubmit={this.submit}
        initialValues={this.getInitialValues()}
      />
    );
  }
}
export default RegisterFormContainer;
