import { useState, useEffect } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Building2,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useProfile, UserProfile } from "@/hooks/use-profile";
import { motion } from "framer-motion";

interface ProfileEditorProps {
  onSignOut?: () => void;
}

export const ProfileEditor = ({ onSignOut }: ProfileEditorProps) => {
  const { user, signOut } = useAuth();
  const { getProfile, updateProfile, loading } = useProfile();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    shipping_address: {
      street: "",
      city: "",
      province: "",
      code: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;

      const { data } = await getProfile(user.id);
      if (data) {
        setProfile(data as UserProfile);
        setFormData({
          full_name: data.full_name || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          shipping_address: {
            street: data.shipping_address?.street || "",
            city: data.shipping_address?.city || "",
            province: data.shipping_address?.province || "",
            code: data.shipping_address?.code || "",
          },
        });
      }
      setProfileLoading(false);
    };

    loadProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    if (onSignOut) onSignOut();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address_")) {
      const addressField = name.replace("address_", "");
      setFormData((prev) => ({
        ...prev,
        shipping_address: {
          ...prev.shipping_address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    const { error } = await updateProfile(user.id, {
      full_name: formData.full_name,
      phone: formData.phone,
      shipping_address: formData.shipping_address,
    } as Partial<UserProfile>);

    if (!error) {
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              full_name: formData.full_name,
              phone: formData.phone,
              shipping_address: formData.shipping_address,
            }
          : null,
      );
      setIsEditing(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* User Info Header */}
      <div className="bg-card p-6 sm:p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UserIcon size={24} strokeWidth={1.5} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-lg sm:text-xl font-bold">
              {user?.email}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formData.full_name || "No name set"}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-border rounded-sm hover:border-destructive hover:text-destructive transition-colors"
          >
            <LogOut size={16} strokeWidth={1.5} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-card p-6 sm:p-8 rounded-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-lg font-semibold">
            Profile Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs sm:text-sm text-primary hover:underline font-medium"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-border bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+27 11 000 0000"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-border bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="address_street"
                value={formData.shipping_address.street}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-4 py-2.5 text-xs sm:text-sm border border-border bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="address_city"
                  value={formData.shipping_address.city}
                  onChange={handleInputChange}
                  placeholder="Johannesburg"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-border bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Province
                </label>
                <input
                  type="text"
                  name="address_province"
                  value={formData.shipping_address.province}
                  onChange={handleInputChange}
                  placeholder="Gauteng"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-border bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="address_code"
                  value={formData.shipping_address.code}
                  onChange={handleInputChange}
                  placeholder="2193"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm border border-border bg-background rounded-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-body text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all hover:bg-gold-dark disabled:opacity-60 mt-6"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-4">
              <Mail
                size={18}
                strokeWidth={1.5}
                className="text-muted-foreground flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                  Email
                </p>
                <p className="text-xs sm:text-sm font-medium">{user?.email}</p>
              </div>
            </div>
            {formData.full_name && (
              <div className="flex gap-4">
                <UserIcon
                  size={18}
                  strokeWidth={1.5}
                  className="text-muted-foreground flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                    Full Name
                  </p>
                  <p className="text-xs sm:text-sm font-medium">
                    {formData.full_name}
                  </p>
                </div>
              </div>
            )}
            {formData.phone && (
              <div className="flex gap-4">
                <Phone
                  size={18}
                  strokeWidth={1.5}
                  className="text-muted-foreground flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                    Phone
                  </p>
                  <p className="text-xs sm:text-sm font-medium">
                    {formData.phone}
                  </p>
                </div>
              </div>
            )}
            {formData.shipping_address.street && (
              <div className="flex gap-4">
                <MapPin
                  size={18}
                  strokeWidth={1.5}
                  className="text-muted-foreground flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                    Address
                  </p>
                  <p className="text-xs sm:text-sm font-medium">
                    {formData.shipping_address.street}
                    {formData.shipping_address.city &&
                      `, ${formData.shipping_address.city}`}
                    {formData.shipping_address.province &&
                      `, ${formData.shipping_address.province}`}
                    {formData.shipping_address.code &&
                      ` ${formData.shipping_address.code}`}
                  </p>
                </div>
              </div>
            )}
            {!formData.full_name &&
              !formData.phone &&
              !formData.shipping_address.street && (
                <p className="text-xs sm:text-sm text-muted-foreground py-4">
                  No profile information added yet. Click Edit to add your
                  details.
                </p>
              )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
