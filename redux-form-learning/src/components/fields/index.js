import React from "react";

export const customInput = props => {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props.input} type={props.type} />
      {props.meta.error && props.meta.touched && (
        <div style={{ color: "red" }}>{props.meta.error}</div>
      )}
    </div>
  );
};

export const customSelect = props => {
  return (
    <div>
      <label>{props.label}</label>
      <select {...props.input}>
        <option />
        <option value="tabs">Tabs</option>
        <option value="spaces">Spaces</option>
      </select>
      {props.meta.error && props.meta.touched && (
        <div style={{ color: "red" }}>{props.meta.error}</div>
      )}
    </div>
  );
};
