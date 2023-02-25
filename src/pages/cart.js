import { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import CartContext from "@/lib/context/Cart";
import graphql from "@/lib/graphql";
import getProductById from "@/lib/graphql/queries/getProductById";
import Link from "next/link";
import getStripe from "@/lib/stripe";

const Cart = () => {
  const { items } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const hasProducts = Object.keys(items).length;
  const toStringProducts = JSON.stringify(products);

  useEffect(() => {
    if (!hasProducts) {
      return;
    }

    graphql
      .request(getProductById, {
        ids: Object.keys(items),
      })
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, [toStringProducts]);

  const getTotal = () => {
    if (!products.length) {
      return 0;
    }

    return Object.keys(items)
      .map(
        (id) =>
          products.find((product) => product.id === id).price *
          (items[id] / 100)
      )
      .reduce((x, y) => x + y)
      .toFixed(2);
  };

  const handlePayment = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    });

    const { session } = await res.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <Box rounded="xl" boxShadow="2xl" w="container.lg" p="16" bgColor="white">
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Cart
      </Text>
      <Divider my="10" />
      <Box>
        {!hasProducts ? (
          <Text>The cart is empty.</Text>
        ) : (
          <>
            {products.map((product) => (
              <Flex key={product.id} justifyContent="space-between" mb="4">
                <Box>
                  <Link href={`/product/${product.slug}`} passHref>
                    <Text
                      fontWeight="bold"
                      _hover={{
                        textDecoration: "underline",
                        color: "blue.500",
                      }}
                    >
                      {product.name}
                      <Text as="span" color="gray.500">
                        {" "}
                        x {items[product.id]}
                      </Text>
                    </Text>
                  </Link>
                </Box>
                <Box>
                  {(items[product.id] * (product.price / 100)).toFixed(2)} 유로
                </Box>
              </Flex>
            ))}
            <Divider my="10" />
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">
                Total: {getTotal()} 유로
              </Text>
              <Button colorScheme="blue" onClick={handlePayment}>
                Pay Now
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
