import zacs from "@nozbe/zacs";
import style from "./style.module.css";

const ListHeaderRaw = zacs.text(style.title);

const ListHeader = ({ children }) => {
  return <ListHeaderRaw>{children}</ListHeaderRaw>;
};

export default ListHeader;
