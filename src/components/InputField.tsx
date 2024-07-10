interface Props {
  name: string;
  fieldValue: string;
  setValue: (arg0: string) => void;
}

const InputField = ({ name, fieldValue, setValue }: Props) => {
  return (
    <>
      <div className="input-field-content">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            {name}
          </span>
          <input
            type="text"
            className="form-control flex-column col-4"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => setValue(e.target.value)}
            value={fieldValue}
          ></input>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default InputField;
