import { Checkbox } from "@chakra-ui/react";

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
    <Checkbox
    isChecked={isUnisex}
    onChange={(e) => setValue(!isUnisex)}>Include unisex names</Checkbox>
    </>
  );
};

export default UnisexCheckbox;
