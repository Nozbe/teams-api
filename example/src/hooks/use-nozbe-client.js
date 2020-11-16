import { useState } from "react";
import TeamsApi from "teams-api";

const useNozbeClient = () => {
  const [client, setClient] = useState(null);

  const createNozbeClient = (token) => {
    const nozbeClient = new TeamsApi(token);

    setClient(nozbeClient);
  };

  return [client, createNozbeClient];
};

export default useNozbeClient;
