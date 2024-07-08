interface Props {
  name: string;
  fieldValue: string;
  setValue: (arg0: string) => void;
}

const InputField = ({ name, fieldValue, setValue }: Props) => {

  return (
    <>
    <label htmlFor={name}>{name}</label><br></br>
    <input type='text' id={name} value={fieldValue}
    onChange={e => setValue(e.target.value)}></input><br></br>
    </>
  );
}

export default InputField;