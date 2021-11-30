import React, { useState, useEffect } from "react";
import List from "../components/List/List";
import axios from "../api";
import kanbanContext from "../contexts/kanbanContext";
import InputContainer from "../components/Input/InputContainer";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from '../components/Header/index';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", MySwal.stopTimer);
    toast.addEventListener("mouseleave", MySwal.resumeTimer);
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "calc(100vh - 80px)",
    background: "#CEEDDB",
    overflowY: "auto",
  },
}));
export default function Kanban() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  async function getKanban() {
    try {
      const { data } = await axios.get("/kanbans");
      setData(data[0]);
    } catch (error) {}
  }

  async function addMoreCard(name, listId) {
    try {
      await axios.post("/cards", {
        listId,
        name,
      });

      Toast.fire({
        icon: "success",
        title: "Cartão criado.",
      });
    } catch (err) {
      const message = err.response.data.message;
      Toast.fire({
        icon: "error",
        title: message,
      });
    }

    getKanban();
  }

  async function addList(name, kanbanId) {
    try {
      await axios.post("/lists", {
        kanbanId,
        name,
      });

      Toast.fire({
        icon: "success",
        title: "Lista Criada.",
      });

      getKanban();
    } catch (err) {
      const message = err.response.data.message;
      Toast.fire({
        icon: "error",
        title: message,
      });
    }
  }

  async function updateList(name, listId) {
    await axios.patch("/lists/" + listId, {
      listId,
      name,
    });
  }

  useEffect(() => {
    getKanban();
  }, []);

  async function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const list = data.lists.find((list) => list._id === draggableId);

      data.lists.splice(source.index, 1);
      data.lists.splice(destination.index, 0, list);

      setData(data);

      await axios.put("/lists/positions/" + data._id, {
        lists: data.lists,
      });

      Toast.fire({
        icon: "success",
        title: "Lista movida.",
      });

      return;
    }

    const sourceList = data.lists.find(
      (list) => list._id === source.droppableId
    );
    const sourceListId = data.lists.findIndex(
      (list) => list._id === source.droppableId
    );
    const destinationList = data.lists.find(
      (list) => list._id === destination.droppableId
    );
    const destinationListId = data.lists.findIndex(
      (list) => list._id === destination.droppableId
    );
    const draggingCard = sourceList.cards.find(
      (card) => card._id === draggableId
    );

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      draggingCard.listId = destinationList._id;
      data.lists[sourceListId] = destinationList;

      setData(data);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      data.lists[sourceListId] = sourceList;
      data.lists[destinationListId] = destinationList;

      setData(data);
    }

    await axios.put("/lists/positions/" + data._id, {
      lists: data.lists,
    });
  }

  async function deleteCard(id) {
    try {
      const result = await MySwal.fire({
        title: "Tem certeza quer deseja apagar o cartão?",
        showDenyButton: true,
        confirmButtonText: "Apagar",
        denyButtonText: `Cancelar`,
      });

      if (result.isConfirmed) {
        await axios.delete("/cards/" + id);

        Toast.fire({
          icon: "success",
          title: "O Cartão foi deletado.",
        });

        getKanban();
      }
    } catch (err) {
      const message = err.response.data.message;
      Toast.fire({
        icon: "error",
        title: message,
      });
    }
  }

  async function deleteList(id) {
    try {
      const result = await MySwal.fire({
        title: "Tem certeza quer deseja apagar a lista?",
        showDenyButton: true,
        confirmButtonText: "Apagar",
        denyButtonText: `Cancelar`,
      });

      if (result.isConfirmed) {
        await axios.delete("/lists/" + id);

        Toast.fire({
          icon: "success",
          title: "A Lista foi apagada.",
        });

        getKanban();
      }
    } catch (err) {
      const message = err.response.data.message;
      Toast.fire({
        icon: "error",
        title: message,
      });
    }
  }

  async function updateCard({ name, description, id }) {
    try {
      await axios.put("/cards/" + id, {
        description,
        name,
      });
        getKanban();
    } catch (err) {
      const message = err.response.data.message;
      Toast.fire({
        icon: "error",
        title: message,
      });
    }
    
  }

  return (
    <kanbanContext.Provider
    value={{
      addMoreCard,
      addList,
      updateList,
      deleteCard,
      deleteList,
      updateCard,
    }}
    >
    <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div
              className={classes.root}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data?.lists?.map((list, index) => {
                return <List list={list} key={list._id} index={index} />;
              })}
              <InputContainer type="list" kanbanId={data?._id} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </kanbanContext.Provider>
  );
}
