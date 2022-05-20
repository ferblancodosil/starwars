import PropTypes from "prop-types"
import "./index.scss"
import React from "react";

function Button ({ href, onClick, withstyles = true, text, icon }) {
  const Component = href ? 'a' : 'button'
  return (
    <Component href={href} onClick={() => onClick && onClick()} className={!withstyles && 'btn-no-style'} to="/">
      {icon && <i className={icon}></i>}
      {text}
    </Component>
  )
}

Button.propTypes = {
  onClick: PropTypes.string,
  href: PropTypes.string,
  withstyles: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default Button
