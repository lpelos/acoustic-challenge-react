import React from 'react';

const Input = (props) => {
  const {
    className = '',
    id = '',
    invalidFeedback = '',
    label = '',
    name = '',
    placeholder = '',
    required = false,
    touched = false,
    valid = true,
    value = '',
    onBlur,
    onChange,
  } = props;

  let groupClassName = 'form-group mt-3';
  if (className) { groupClassName = `${className} ${groupClassName}`; }

  let inputClassName = 'form-control';
  if (touched) {
    const validClassName = valid ? 'is-valid' : 'is-invalid';
    inputClassName = `${inputClassName} ${validClassName}`;
  }

  return (
    <div className={groupClassName}>
      {label && <label htmlFor="contentHubIdInput">{label}</label>}

      <input
        className={inputClassName}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        type="text"
        value={value}
        onBlur={e => onBlur && onBlur(e)}
        onChange={e => onChange && onChange(e.target.value)}
      />

      {invalidFeedback && <div className="invalid-feedback">{invalidFeedback}</div>}
    </div>
  );
};

export default Input;
