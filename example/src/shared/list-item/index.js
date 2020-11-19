import zacs from "@nozbe/zacs";
import style from "./style.module.css";

const Item = zacs.styled("li", style.listItem, {
  selectable: style.selectable,
  selected: style.selected,
});

const ListItem = ({ onClick, selectable, selected, children }) => {
  return (
    <Item {...{ onClick }} selectable={selectable} selected={selected}>
      {children}
    </Item>
  );
};

export default ListItem;
