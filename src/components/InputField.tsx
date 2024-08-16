import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { MutableRefObject } from "react";

interface Props {
  name: string;
  fieldValue: MutableRefObject<string>;
  isSearchDisabledFunction: () => void;
}

const InputField = ({ name, fieldValue, isSearchDisabledFunction }: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fieldValue.current = (event.target.value);
    isSearchDisabledFunction();
  }

  return (
    <>
      <InputGroup>
        <InputLeftAddon fontSize="sm">{name}</InputLeftAddon>
        <Input onChange={(e) => handleChange(e)} backgroundColor="white"/>
      </InputGroup>
    </>
  );
};

export default InputField;
