import React, { useState, useRef } from "react";
import "./MultipleSelectDropdown.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

export default function MultiSelectDropdown({
  options,
  setValue,
  questionIdx
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOptions, _setMenuOptions] = useState([...options]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const menuRef = useRef(menuOptions);

  const setMenuOptions = data => {
    menuRef.current = data;
    _setMenuOptions(data);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClick = option => {
    const newData = menuOptions.filter(opt => opt !== option);
    setMenuOptions(newData);
    const newOptions = selectedOptions.concat([option]);
    setSelectedOptions(newOptions);
    const optionIdx = options.indexOf(option);
    setValue(`${questionIdx}-${optionIdx}`, true)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = option => {
    const newMenuOptions = menuOptions.concat([option]).sort();
    setMenuOptions(newMenuOptions);
    const newSelectedOptions = selectedOptions
      .filter(opt => {
        return opt !== option;
      })
      .sort();
    const optionIdx = options.indexOf(option);
    setValue(`${questionIdx}-${optionIdx}`, false);
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className="multiselect-dropdown">
      <Button className="multiselect-button"
        aria-controls="simple-menu"
        aria-haspopup="true"
        disableRipple
        onClick={handleClick}
      >
        Select an option
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuOptions.map(opt => {
          return (
            <MenuItem
              key={opt}
              className="menu-item"
              onClick={() => handleOptionClick(opt)}
            >
              <Chip key={opt} className="menu-chip" label={opt} size="small" />
            </MenuItem>
          );
        })}
      </Menu>
      <div>
        {selectedOptions.map(option => (
          <Chip
            key={option}
            className="selectedChip"
            label={option}
            size="small"
            onDelete={() => handleDelete(option)}
          />
        ))}
      </div>
    </div>
  );
}
