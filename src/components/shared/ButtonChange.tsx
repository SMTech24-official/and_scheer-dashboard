
type ButtonChangeProps = {
  title?: string;
  padding?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function ButtonChange({
  title = 'Save Changes',
  padding = 'py-3 px-6',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonChangeProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-white rounded-lg  ${padding} ${className} transition hover:bg-green-600 cursor-pointer disabled:opacity-50`}
    >
      {title}
    </button>
  );
}
