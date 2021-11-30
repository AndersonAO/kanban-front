import React, { useState, useContext } from "react";
import { Paper } from "@material-ui/core";

import kanbanContext from '../../contexts/kanbanContext';

import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";

import Dropdown from "../Dropdown/Dropdown";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import CardInfo from "../CardInfo/CardInfo";

import './Card.css'

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    cursor: "pointer",
    overflowWrap: 'break-word'
  },
}));

export default function Card({ card, index }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { deleteCard } = useContext(kanbanContext)

  const classes = useStyle();
  return (
    <>
      {showModal && (
        <CardInfo onClose={() => setShowModal(false)} card={card} />
      )}
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            onClick={() => setShowModal(true)}
            className="card"
          >
            <div
              className="card_top_more"
              onClick={(event) => {
                event.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              <MoreHorizIcon />
              {showDropdown && (
                <Dropdown
                  class="board_dropdown"
                  onClose={() => setShowDropdown(false)}
                >
                  <p onClick={() => deleteCard(card._id)}>
                    Deletar Cartão
                  </p>
                </Dropdown>
              )}
            </div>
            <Paper className={classes.card}>{card?.name} </Paper>
          </div>
        )}
      </Draggable>
    </>
  );
}
