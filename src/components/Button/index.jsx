import PropTypes from "prop-types"
import "./index.scss"
import React from "react";

function Button ({ href, click, withstyles = true, text, icon, disabled=false }) {
  const Component = href ? 'a' : 'button'
  return (
    <Component href={href} onClick={() => click && click()} className={!withstyles ? 'btn-no-style' : ''} to="/" disabled={disabled}>
      {icon && <i className={icon}></i>}
      {text}
    </Component>
  )
}

Button.propTypes = {
  click: PropTypes.func,
  href: PropTypes.string,
  withstyles: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button
