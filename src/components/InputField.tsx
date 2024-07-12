import { Input, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react";

interface Props {
  name: string;
  fieldValue: string;
  setValue: (arg0: string) => void;
}

const InputField = ({ name, fieldValue, setValue }: Props) => {
  return (
    <>
      <InputGroup>
        <InputLeftAddon>{name}</InputLeftAddon>
        <Input onChange={(e) => setValue(e.target.value)} value={fieldValue} backgroundColor="white"/>
      </InputGroup>
    </>
  );
};

export default InputField;
