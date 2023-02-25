// import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import CartContext from "@/lib/context/Cart";

export default function App({ Component, pageProps }) {
  const [items, setItems] = useState({});

  return (
    // <UserProvider>
    <ChakraProvider>
      <CartContext.Provider value={{ items, setItems }}>
        <Flex w="full" minH="100vh" bgColor="gray.100">
          <NavBar />
          <Box maxW="70vw" m="auto">
            <Component {...pageProps} />
          </Box>
        </Flex>
      </CartContext.Provider>
    </ChakraProvider>
    // </UserProvider>
  );
}
