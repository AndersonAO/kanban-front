import React from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Card from "../Card/Card";
import InputContainer from "../Input/InputContainer";
import { Droppable, Draggable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    backgroundColor: "#ebecf0",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    cursor: 'pointer',
  },
  cardContainer: {
    marginTop: theme.spacing(4),
    cursor: 'pointer'
  },
}));
export default function List({ list, index }) {
  const classes = useStyle();
  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <Title title={list.name} listId={list._id}/>
            <Droppable droppableId={list._id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.cardContainer}
                >
                  {list?.cards?.map((card, index) => (
                    <Card card={card} key={card._id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <InputContainer listId={list._id} type="card" />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
