import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "61595d083738e41b22ea54fd",
      user: "614d84ced02a5c82c4b4e54e",
      title: "my title 1",
      description: "hello friends i am from udaipur",
      tag: "style1",
      date: "2021-10-03T07:34:32.944Z",
      __v: 0,
    },
    {
      _id: "61595d1b3738e41b22ea54ff",
      user: "614d84ced02a5c82c4b4e54e",
      title: "my title 2",
      description: "hello friends",
      tag: "tag12",
      date: "2021-10-03T07:34:51.747Z",
      __v: 0,
    },
    {
      _id: "61595d083738e41b22ea54fd",
      user: "614d84ced02a5c82c4b4e54e",
      title: "my title 1",
      description: "hello friends i am from udaipur",
      tag: "style1",
      date: "2021-10-03T07:34:32.944Z",
      __v: 0,
    },
    {
      _id: "61595d1b3738e41b22ea54ff",
      user: "614d84ced02a5c82c4b4e54e",
      title: "my title 2",
      description: "hello friends",
      tag: "tag12",
      date: "2021-10-03T07:34:51.747Z",
      __v: 0,
    },
    {
      _id: "61595d083738e41b22ea54fd",
      user: "614d84ced02a5c82c4b4e54e",
      title: "my title 1",
      description: "hello friends i am from udaipur",
      tag: "style1",
      date: "2021-10-03T07:34:32.944Z",
      __v: 0,
    },
    {
      _id: "61595d1b3738e41b22ea54ff",
      user: "614d84ced02a5c82c4b4e54e",
      title: "my title 2",
      description: "hello friends",
      tag: "tag12",
      date: "2021-10-03T07:34:51.747Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(initialNotes);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
