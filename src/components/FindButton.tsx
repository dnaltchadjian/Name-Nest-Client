import { Button } from "@chakra-ui/react";

interface Props {
  children: string;
  isDisabled: boolean;
  onClick: () => void;
}

const FindButton = ({ children, onClick, isDisabled }: Props) => {
  return (
    <Button onClick={onClick} children={children} colorScheme="buttonColor" isDisabled={isDisabled}>
    </Button>
  );
};

export default FindButton;
