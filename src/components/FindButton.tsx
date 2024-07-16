import { Button } from "@chakra-ui/react";

interface Props {
  children: string;
  isDisabled: boolean;
  onClick: () => void;
}

const FindButton = ({ children, onClick, isDisabled }: Props) => {
  return (
    <Button onClick={onClick} children={children} colorScheme="green" isDisabled={isDisabled}>
    </Button>
  );
};

export default FindButton;
