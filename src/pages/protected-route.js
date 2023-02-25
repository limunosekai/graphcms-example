import { useRouter } from "next/router";
import useAuth from "@/lib/hooks/useAuth";

import styles from "../styles/app.module.css";

const ProtectedRoute = () => {
  const router = useRouter();
  const { loggedIn, isLoading, error } = useAuth();

  if (!isLoading && !loggedIn) {
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>An Error occurred...</p>}
      {loggedIn && (
        <>
          <h1>Protected Route</h1>
        </>
      )}
    </div>
  );
};

export default ProtectedRoute;
