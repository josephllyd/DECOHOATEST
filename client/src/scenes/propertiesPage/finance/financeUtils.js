const handleCloseAddFinanceDialog = (
    setIsAddFinanceDialogOpen,
    setUser,
    setName,
    setProperty,
    setpaymentType,
    setAmount,
    setDate,
    setReceipt
) => {
    setIsAddFinanceDialogOpen(false);
    setUser({ _id: "", name: "" });
    setName("");
    setProperty("");
    setpaymentType("");
    setAmount("");
    setDate("");
    setReceipt("");
  };
  
  export { handleCloseAddFinanceDialog};