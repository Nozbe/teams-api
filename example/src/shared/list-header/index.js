import zacs from "@nozbe/zacs";
import style from "./style.module.css";

const ListHeader = zacs.text(style.title);

const ListHeaderComponent = ({ children }) => {
  return <ListHeader>{children}</ListHeader>;
};

export default ListHeaderComponent;
