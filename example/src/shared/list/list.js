import React from "react";
import zacs from "@nozbe/zacs";

import style from "./list.module.css";
import ListItem from "../list-item/list-item";

const Box = zacs.view(style.listContainer);

const List = zacs.styled("ul", style.list, {
  selectable: style.selectable,
});

const ListComponent = ({
  items,
  selectedItemId,
  handleSelect,
  defaultItemName,
  itemContentKey,
  selectable,
}) => (
  <Box>
    <List selectable={selectable}>
      {items &&
        items.map((item) => {
          const itemName = item[itemContentKey] || item.name;

          return (
            <ListItem
              key={item.id}
              onClick={() => handleSelect && handleSelect(item.id)}
              selectable={selectable}
              selected={item.id === selectedItemId}
            >
              {itemName && itemName.length ? itemName : defaultItemName}
            </ListItem>
          );
        })}
    </List>
  </Box>
);

export default ListComponent;
