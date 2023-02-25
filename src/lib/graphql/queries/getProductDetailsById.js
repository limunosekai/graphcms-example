import { gql } from "graphql-request";

export default gql`
  query GetProductDetailsById($ids: [ID!]) {
    products(where: { id_in: $ids }) {
      id
      name
      slug
      price
      description
      images {
        id
        url
      }
    }
  }
`;
