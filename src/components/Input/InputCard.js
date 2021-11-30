import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import { makeStyles, alpha } from "@material-ui/core/styles";
import kanbanContext from "../../contexts/kanbanContext";

import ClearIcon from "@material-ui/icons/Clear";
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    backgroundColor: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: alpha("#5AAC44", 0.25),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));
export default function InputCard({ setOpen, listId, type, kanbanId }) {
  const classes = useStyle();
  const [title, setTitle] = useState(null);
  const { addMoreCard, addList } = useContext(kanbanContext);

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBtnConfirm = async () => {
    if (type === "card") {
      await addMoreCard(title, listId);
      setTitle("");
      setOpen(false);
    } else {
      await addList(title, kanbanId);
      setTitle("");
      setOpen(false);
    }
  };
  const handleBlur = async () => {
    await wait(100);
    setOpen(false);
    setTitle("");
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            onBlur={handleBlur}
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            placeholder={
              type === "card"
                ? "Insira o título do cartão..."
                : "Insira o título da lista..."
            }
            value={title}
            autoFocus
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
          Adicionar
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
