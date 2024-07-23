import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Square, useDisclosure } from "@chakra-ui/react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";

const FavouritesDrawer = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Square onClick={onOpen} cursor="pointer">
                <FaStar/>
            </Square>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default FavouritesDrawer;