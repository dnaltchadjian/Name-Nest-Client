import { Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Heading, HStack, List, ListItem, Spacer, Square, useDisclosure } from "@chakra-ui/react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { useEffect, useState } from "react";
import { ColorConstants } from "../util/ColorConstants";

interface Props {
    favorites: FirstName[];
}

const FavouritesDrawer = ({ favorites }: Props) => {
    
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
                                    <Heading size="sm" alignContent="baseline" paddingTop="2px">{nameObject.name}</Heading>
                                    <Spacer></Spacer>
                                    <Square cursor="pointer" textAlign="end">
                                        <FaStar color={ColorConstants.GOLD}/>
                                    </Square>
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