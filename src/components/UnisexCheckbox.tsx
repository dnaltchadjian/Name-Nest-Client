interface Props {
  gender: string;
  isUnisex: boolean;
  setValue: (arg0: boolean) => void;
}

const UnisexCheckbox = ({ gender, isUnisex, setValue }: Props) => {
  if (gender === "All") {
    return null;
  }
  return (
    <>
      <label className="labelSpaced">Include unisex names: </label>
      <input
        className="unisexCheckbox"
        type="checkbox"
        id="unisexCheckbox"
        checked={isUnisex}
        onChange={(e) => setValue(!isUnisex)}
      />
      <br></br>
    </>
  );
};

export default UnisexCheckbox;
