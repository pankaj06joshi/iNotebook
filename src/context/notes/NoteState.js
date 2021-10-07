import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Fetching All notes
  const fetchAllNotes = async () => {
    //  api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDg0Y2VkMDJhNWM4MmM0YjRlNTRlIn0sImlhdCI6MTYzMjQ3MTM0Nn0.ilRVpUGKKuQUJp72KGcyfc3x6QRPv0FfVBEtgmgEWNY",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    //  api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDg0Y2VkMDJhNWM4MmM0YjRlNTRlIn0sImlhdCI6MTYzMjQ3MTM0Nn0.ilRVpUGKKuQUJp72KGcyfc3x6QRPv0FfVBEtgmgEWNY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    //  api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDg0Y2VkMDJhNWM4MmM0YjRlNTRlIn0sImlhdCI6MTYzMjQ3MTM0Nn0.ilRVpUGKKuQUJp72KGcyfc3x6QRPv0FfVBEtgmgEWNY",
      },
    });
    const json = await response.json();
    console.log(json);

    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //  api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZDg0Y2VkMDJhNWM4MmM0YjRlNTRlIn0sImlhdCI6MTYzMjQ3MTM0Nn0.ilRVpUGKKuQUJp72KGcyfc3x6QRPv0FfVBEtgmgEWNY",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    // edit note on client side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
