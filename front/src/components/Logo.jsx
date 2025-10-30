const Logo = ({ className = "", ...props }) => {
  return (
    <img
      src="/img/logo_rosado_y_marron.png"
      alt="Logo de BookMemory"
      className={className}
      {...props}
    />
  );
};

export default Logo;