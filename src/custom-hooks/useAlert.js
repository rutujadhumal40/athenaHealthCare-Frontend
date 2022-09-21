import { useState } from "react";

const useAlert = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  return {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    isUpdated,
    setIsUpdated,
    inProgress,
    setInProgress,
  };
};

export default useAlert;
