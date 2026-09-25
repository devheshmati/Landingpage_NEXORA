export const useContactModal = () => {
  const isOpen = useState<boolean>("contact_modal_open", () => false);

  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
