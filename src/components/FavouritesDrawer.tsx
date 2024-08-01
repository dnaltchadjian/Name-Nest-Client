import { Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Heading, HStack, Spacer, Square, Tooltip, useDisclosure } from "@chakra-ui/react";
import { FaRegTrashAlt } from "@react-icons/all-files/fa/FaRegTrashAlt";
import { FaMinusCircle } from "@react-icons/all-files/fa/FaMinusCircle";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { ColorConstants } from "../util/ColorConstants";
import { NameUtil } from "../util/NameUtil";
import React from "react";

interface Props {
    favorites: FirstName[];
    removeFavoriteFunction: (nameObject: FirstName) => void;
    removeAllFavoritesFunction: () => void;
}

const FavouritesDrawer = ({ favorites, removeFavoriteFunction, removeAllFavoritesFunction }: Props) => {
    
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
                    <DrawerHeader borderBottomWidth='1px'>
                        <Heading size="md">Favorite Names</Heading>
                    </DrawerHeader>
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
                    <DrawerHeader paddingBottom="inherit">
                        <HStack>
                            <Heading size="md">Favorite Names</Heading>
                            <Spacer></Spacer>
                            <Tooltip label={"Remove all favorites"} fontSize="sm">
                                <Square cursor="pointer" textAlign="end" onClick={() => removeAllFavoritesFunction()}>
                                    <FaRegTrashAlt color={ColorConstants.RED}/>
                                </Square>
                            </Tooltip>
                        </HStack>
                    </DrawerHeader>
                    <Divider></Divider>
                    <DrawerBody>
                        {favorites?.map((nameObject : FirstName, index) => (
                            <React.Fragment key={index.toString()}>
                                <HStack>
                                    <Tooltip label={NameUtil.getGenderFull(nameObject.gender)}>
                                        <Heading size="sm" alignContent="baseline" paddingTop="2px">{nameObject.name}</Heading>
                                    </Tooltip>
                                    <Spacer></Spacer>
                                    <Tooltip label={"Remove from favorites"} fontSize='sm'>
                                        <Square cursor="pointer" textAlign="end" onClick={() => removeFavoriteFunction(nameObject)}>
                                            <FaMinusCircle color={"#333333"}/>
                                        </Square>
                                    </Tooltip>
                                </HStack>
                                <Divider></Divider>
                            </React.Fragment>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default FavouritesDrawer;