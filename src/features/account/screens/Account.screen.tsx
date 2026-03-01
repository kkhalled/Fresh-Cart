"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import ProfileSection from "../components/ProfileSection";
import SecuritySection from "../components/SecuritySection";

/* ─── Animation Variants ────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   AccountScreen
   Professional account management screen with navy background, profile and 
   security sections in a responsive 2-column layout.
   ═══════════════════════════════════════════════════════════════════════════ */
export default function AccountScreen() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#1B2551] via-[#2A3662] to-[#1B2551]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-teal-500/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Account Settings
            </h1>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Manage your profile information and security preferences
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Two-column Layout (Desktop) / Stacked (Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-5 h-5 text-teal-400"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Personal Information
                </h2>
              </div>
              <ProfileSection />
            </motion.div>

            {/* Security Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="w-5 h-5 text-teal-400"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Security & Password
                </h2>
              </div>
              <SecuritySection />
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-sm text-neutral-400">
              Your data is encrypted and stored securely. We never share your
              information with third parties.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
