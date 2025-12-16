export default function Button({
  text,
  type = "submit",
  variant = "primary",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {text}
    </button>
  );
}
