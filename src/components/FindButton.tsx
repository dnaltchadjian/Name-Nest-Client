import { Button } from "@chakra-ui/react";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const FindButton = ({ onClick, isDisabled }: Props) => {
  return (
    <Button onClick={onClick} colorScheme="green" isDisabled={isDisabled}>
      Find Names
    </Button>
  );
};

export default FindButton;
