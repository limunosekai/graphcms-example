// import { useUser } from "@auth0/nextjs-auth0/client";
import ProductCard from "@/components/ProductCard";
import graphql from "@/lib/graphql";
import getAllProducts from "@/lib/graphql/queries/getAllProducts";
import { Grid } from "@chakra-ui/react";

// export default function Home() {
// const { user, error, isLoading } = useUser();

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>{error.message}</div>;
// }

// if (user) {
//   return (
//     <div>
//       <h1>Welcome back !</h1>
//       <p>로그인이 된 사용자입니다</p>
//       <p>email: {user.email}</p>
//       <a href="/api/auth/logout">Logout</a>
//     </div>
//   );
// }

// return (
//   <div>
//     <h1>Welcome, Stranger!</h1>
//     <p>
//       로그인을 해주세요.
//       <a href="/api/auth/login">Login</a>
//     </p>
//   </div>
// );
// }

export const getStaticProps = async () => {
  const { products } = await graphql.request(getAllProducts);
  return {
    revalidate: 60, // 60 seconds
    props: {
      products,
    },
  };
};

export default function Home(props) {
  return (
    <Grid gridTemplateColumns="repeat(4, 1fr)" gap="5">
      {props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
}
