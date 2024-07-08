interface Props {
  children: string;
  colour?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button = ({ children, colour = "primary", onClick }: Props) => {
  return (
    <button className={"btn btn-" + colour} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
