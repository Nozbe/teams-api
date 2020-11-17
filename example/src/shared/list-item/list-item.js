import zacs from "@nozbe/zacs";
import style from "./style.module.css";

console.log(style);

const Item = zacs.styled("li", style.listItem);

const ListItem = ({ onClick, children }) => {
  return <Item {...{ onClick }}>{children}</Item>;
};

export default ListItem;
