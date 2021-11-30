import React, { useState, useContext } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import kanbanContext from "../../contexts/kanbanContext";
import Dropdown from "../Dropdown/Dropdown";


const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    marginLeft: theme.spacing(1),
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
    "&:focus": {
      backgroundColor: "#DDD",
    },
  },
  optionsList: {
    '&:hover':{
      background: alpha("#69788a", 0.25),
      cursor: 'pointer'
    }
  },
  'board_header_title_more': {
    cursor: 'pointer',
    position: 'relative',
  }
}));
export default function Title({ title, listId }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState();
  const [newTitle, setNewTitle] = useState(title);

  const { updateList, deleteList } = useContext(kanbanContext);

  const classes = useStyle();

  function handleOnChange(e) {
    setNewTitle(e.target.value);
  }

  async function handleOnBlur() {
    setOpen(false);
    updateList(newTitle, listId);
  }

  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={handleOnChange}
            value={newTitle}
            inputProps={{
              className: classes.input,
            }}
            autoFocus
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {newTitle}
          </Typography>
          <div
              className={classes.board_header_title_more}
              onClick={(event) => {
                event.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              <MoreHorizIcon className={classes.optionsList}/>
              {showDropdown && (
                <Dropdown
                  class="board_dropdown"
                  onClose={() => setShowDropdown(false)}
                >
                  <p onClick={() => deleteList(listId)}>
                    Deletar lista
                  </p>
                </Dropdown>
              )}
            </div>
          
        </div>
      )}
    </div>
  );
}
