import React from "react";
import zacs from "@nozbe/zacs";

import InputWithButton from "../shared/input-with-button";
import Box from "../shared/box";

import style from "./style.module.css";

const Container = zacs.view(style.container);

const LoginWindow = ({ createClient }) => {
  return (
    <Container>
      <Box>
        <div>
          Welcome to Mononozbe. (monospaced Nozbe, get it? No? I'll walk myself
          out...)
        </div>
        <br />
        <br />
        <InputWithButton
          placeholder="access token..."
          onClick={createClient}
          btnCaption="Login"
        />
      </Box>
    </Container>
  );
};

export default LoginWindow;
