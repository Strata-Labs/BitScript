import CreateLogin from "@/comp/Profile/CreateLogin";
import LoginModal from "@/comp/LoginModal";
import ForgotPassword from "@/comp/ForgotPassword";
import ChangePassword from "@/comp/ChangePassword";
import BuyingOptions from "@/comp/Profile/BuyingOptions";
import TeamChangePassword from "@/comp/TeamChangePassword";
import { useAtom } from "jotai";
import {
  createLoginModal,
  forgotPasswordModal,
  resetPassword,
  showLoginModalAtom,
  teamChangePasswordModal,
  tutorialBuyModal,
  userAtom,
} from "./atom";
import { AnimatePresence } from "framer-motion";

const Modals = () => {
  // buying options model
  const [showBuyingOptions, setShowBuyingOptions] = useAtom(tutorialBuyModal);
  // create login modal
  const [isCreateLoginModalOpen, setIsCreateLoginModalOpen] =
    useAtom(createLoginModal);

  // login modal
  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [user, setUser] = useAtom(userAtom);

  // forgot password modal
  const [forgotPassword, setForgotPasswordModal] = useAtom(forgotPasswordModal);

  // reset password modal
  const [isResetPassword, setIsResetPassword] = useAtom(resetPassword);

  //team change password modal
  const [showTeamPasswordUpdate, setShowTeamPasswordUpdate] = useAtom(
    teamChangePasswordModal
  );

  return (
    <>
      <AnimatePresence>
        {showBuyingOptions && <BuyingOptions />}
      </AnimatePresence>
      <AnimatePresence>
        {isCreateLoginModalOpen && <CreateLogin />}
      </AnimatePresence>
      <AnimatePresence>
        {showLogin && user === null && <LoginModal />}
      </AnimatePresence>
      <AnimatePresence>{forgotPassword && <ForgotPassword />}</AnimatePresence>
      <AnimatePresence>{isResetPassword && <ChangePassword />}</AnimatePresence>
      <AnimatePresence>
        {showTeamPasswordUpdate && <TeamChangePassword />}
      </AnimatePresence>
    </>
  );
};

export default Modals;
