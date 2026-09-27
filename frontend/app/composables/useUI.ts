export const useUI = () => {
  const isContactModalOpen = useState<boolean>("ui:contactModal", () => false);
  const isMobileMenuOpen = useState<boolean>("ui:mobileMenu", () => false);

  // contact modal
  const openContactModal = () => {
    if (isMobileMenuOpen.value) {
      closeMobileMenu();
    }
    isContactModalOpen.value = true;
  };

  const closeContactModal = () => {
    isContactModalOpen.value = false;
  };

  // mobile nav menu
  const openMobileMenu = () => {
    isMobileMenuOpen.value = true;
  };

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen.value) openMobileMenu();
    else closeMobileMenu();
  };

  const resetOverlays = () => {
    closeContactModal();
    closeMobileMenu();
  };

  return {
    isContactModalOpen,
    isMobileMenuOpen,
    openContactModal,
    closeContactModal,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    resetOverlays,
  };
};
