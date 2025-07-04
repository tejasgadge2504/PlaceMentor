import PropTypes from "prop-types";

function Badge({ className = "", ...props }) {
  const classes =
    "inline-flex items-center rounded-full bg-[#27272A] text-white px-4 py-2 text-s font-semibold whitespace-nowrap";

  return <span className={`${classes} ${className}`} {...props} />;
}

Badge.propTypes = {
  className: PropTypes.string,
};

export { Badge };
