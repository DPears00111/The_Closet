import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { AuthForm } from "@/components/AuthForm";
import { ProfileEditor } from "@/components/ProfileEditor";
import { useAuth } from "@/hooks/use-auth";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-2xl">
          <div className="flex justify-center items-center py-20">
            <p className="text-muted-foreground text-sm">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
            My Account
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mb-8 sm:mb-12">
            {user
              ? "Manage your profile and account settings"
              : "Sign in to manage your profile, view orders, and enjoy a seamless checkout experience."}
          </p>

          {user ? (
            <ProfileEditor
              onSignOut={() => {
                navigate("/");
              }}
            />
          ) : (
            <AuthForm
              onSuccess={() => {
                // Profile will automatically update when user state changes
              }}
            />
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Profile;
