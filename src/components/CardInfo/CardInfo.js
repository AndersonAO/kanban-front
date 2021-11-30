import React, { useContext } from "react";

import kanbanContext from '../../contexts/kanbanContext';

import {
  List,
  Type,
} from "react-feather";

import Modal from "../Modal/Modal";
import Editable from "../Editabled/Editable";

import "./CardInfo.css"
function CardInfo(props) {
  const { updateCard } = useContext(kanbanContext)
  const { name, description, _id } = props.card;
  const updateTitle = (value) => {
    updateCard({ description: description, name: value, id: _id })
  };

  const updateDesc = (value) => {
    updateCard({ name: name, description: value, id: _id })
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Título</p>
          </div>
          <Editable
            defaultValue={name}
            text={name}
            placeholder="Insira um título..."
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Descrição</p>
          </div>
          <Editable
            defaultValue={description}
            text={description || "Adicionar uma descrição"}
            placeholder="Insira a descrição..."
            onSubmit={updateDesc}
          />
        </div>

      </div>
    </Modal>
  );
}

export default CardInfo;
