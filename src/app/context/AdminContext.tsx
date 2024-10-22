// AdminContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";

const AdminContext = createContext<boolean | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = useCallback(async () => {
    if (user) {
      try {
        const response = await fetch("/api/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          console.error("Failed to verify admin status.");
          return;
        }

        const data = await response.json().catch((err) => {
          console.error("Error paring JSON: ", err);
          return { isAdmin: false };
        });

        console.log("isAdmin?: ", data);
        setIsAdmin(data.isAdmin || false);
      } catch (error) {
        console.error("Network or server error:", error);
        setIsAdmin(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      checkAdmin();
    }
  }, [user, checkAdmin]);

  return (
    <AdminContext.Provider value={isAdmin}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
