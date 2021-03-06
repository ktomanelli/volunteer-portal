import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import MultipleSelectDropdown from "./MultipleSelectDropdown";

import './MultipleSelect.css';

export default function MultipleSelect({
  possibleValues,
  showAs,
  questionIdx,
  register,
  setValue
}) {
  let display;

  if (showAs === "Dropdown") {
    display = <MultipleSelectDropdown
      options={possibleValues}
      setValue={setValue}
      questionIdx={questionIdx}
    />;
  }

  if (showAs === "List") {
    let options = possibleValues.map((value, idx) => {
      return (
        <ListItem className="multi-select-item" key={value}>
          <Checkbox inputRef={register} name={`${questionIdx}-${idx}`}/>
          <Chip size="small" label={value} />
        </ListItem>
      );
    });
    display = <List>{options}</List>;
  }

  return display;
}
