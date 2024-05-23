import React, { useState } from 'react';
import {
  List, ListItem, ListItemText, Collapse, ListItemIcon, Divider
} from '@mui/material';
import Link from 'next/link';
import { ExpandLess, ExpandMore } from '../Common/Emotes'; // Adjust path as necessary

const MenuSection = ({ menuItems }) => {
  const [open, setOpen] = useState({});

  const handleClick = (text) => {
    setOpen((prevOpen) => ({ ...prevOpen, [text]: !prevOpen[text] }));
  };

  // Function to filter out unwanted props
  const filterProps = (props) => {
    const { icon, handleDragStart, handleDragEnd, actions, ...filteredProps } = props;
    return filteredProps;
  };

  return (
    <List>
      {menuItems.map((item, index) => (
        item.children ? (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleClick(item.text)} {...filterProps(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {open[item.text] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[item.text]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((subItem, subIndex) => (
                  <ListItem button component={Link} href={subItem.path} key={subIndex} sx={{ pl: 4 }} {...filterProps(subItem)}>
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ) : (
          <ListItem button component={Link} href={item.path} key={index} {...filterProps(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )
      ))}
      <Divider />
    </List>
  );
};

export default MenuSection;
