import { Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Square, useDisclosure } from "@chakra-ui/react";
import { FaInfo } from "@react-icons/all-files/fa/FaInfo";

const AboutPopup = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Square cursor="pointer" onClick={onOpen}>
                <FaInfo/>
            </Square>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thanks for checking out NameNest!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody fontSize={12} pb={6}>
                        This tool was born from frustration of looking through what felt like infinite websites; all containing the same names.
                        <br></br>
                        <br></br>
                        The <b>"Starts With"</b> and <b>"Ends With"</b> fields are searches for the start and end of a name,
                        and the <b>"Contains"</b> can be in any part of a name. It is not case sensitive.
                        <br></br>
                        The gender is "All" by default, and all countries in which the name can be found are enabled by default.
                        <br></br>
                        <br></br>
                        For example, putting "ma", "us", and "g", in the "Starts With", "Ends With", and "Contains" fields respectively, along with "Sweden" as the only
                        selected country will yield <b>"Magnus"</b> as the sole result.
                        <br></br>
                        <br></br>
                        The "Favorite" button on the right allows for names to be saved. The "F" icon link is a search of the first name on Forebears.io, which can
                        often give historical context or other information on the name.
                        <br></br>
                        <br></br>
                        Huge credit to Matthias Winkelmann for his <b><Link color='green.500' href="https://github.com/MatthiasWinkelmann/firstname-database" target="#">
                        firstname-database</Link></b> project on Github, which contains all of the names and their associated population data found in this project.
                        <br></br>
                        <br></br>
                        The source code for this project can be found on my Github:
                        <br></br>
                        <b>
                            <Link color='green.500' href="https://github.com/dnaltchadjian/Name-Nest-API" target="#">Spring Boot Backend API</Link>
                            <br></br>
                            <Link color='green.500' href="https://github.com/dnaltchadjian/Name-Nest-Client" target="#">React + Typescript Frontend</Link>
                        </b>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default AboutPopup;