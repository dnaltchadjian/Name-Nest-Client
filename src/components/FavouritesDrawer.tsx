import { Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Heading, HStack, Spacer, Square, Tooltip, useDisclosure } from "@chakra-ui/react";
import { FaRegTrashAlt } from "@react-icons/all-files/fa/FaRegTrashAlt";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { ColorConstants } from "../util/ColorConstants";
import { NameUtil } from "../util/NameUtil";

interface Props {
    favorites: FirstName[];
    removeFavoriteFunction: (nameObject: FirstName) => void;
}

const FavouritesDrawer = ({ favorites, removeFavoriteFunction }: Props) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (favorites === null || favorites.length === 0) {
        return (
            <>
            <Square onClick={onOpen} cursor="pointer" >
            <FaStar color={ColorConstants.GOLD}/>
            </Square>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Favorite Names</DrawerHeader>
                    <DrawerBody>
                        <p>You haven't selected any favorite names yet.</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            </>
        );
    }

    return (
        <>
            <Square onClick={onOpen} cursor="pointer" >
                <FaStar color={ColorConstants.GOLD}/>
            </Square>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader paddingBottom="inherit">Favorite Names</DrawerHeader>
                    <Divider></Divider>
                    <DrawerBody>
                        {favorites?.map((nameObject : FirstName, index) => (
                            <>
                                <HStack>
                                    <Tooltip label={NameUtil.getGenderFull(nameObject.gender)}>
                                        <Heading size="sm" alignContent="baseline" paddingTop="2px">{nameObject.name}</Heading>
                                    </Tooltip>
                                    <Spacer></Spacer>
                                    <Tooltip label={"Remove from favorites"} fontSize='sm'>
                                        <Square cursor="pointer" textAlign="end" onClick={() => removeFavoriteFunction(nameObject)}>
                                            <FaRegTrashAlt color={ColorConstants.RED}/>
                                        </Square>
                                    </Tooltip>
                                </HStack>
                                <Divider></Divider>
                            </>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default FavouritesDrawer;