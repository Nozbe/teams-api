import zacs from "@nozbe/zacs";
import style from "./style.module.css";

const Box = zacs.view(style.box);

const BoxComponent = ({ children }) => <Box>{children}</Box>;

export default BoxComponent;
