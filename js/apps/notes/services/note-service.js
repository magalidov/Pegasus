import { Utils } from "../../../services/utils.service.js";

export const noteService = {
  getNotes,
  addNewNote,
  updateNote,
  deleteNote,
};

var gNotes = _createNotes();

function _createNotes() {
  const notes = Utils.loadFromStorage("gNotes");
  if (!notes) {
    let defaultNotes = [
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        info: {
          txt: "First Note",
          createdAt: "Default",
          editedAt: "",
        },
        style: { 
          backgroundColor: "orange" 
        }
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        info: {
          txt: "Second Note",
          createdAt: "Default",
          editedAt: "",
        },
        style: { 
          backgroundColor: "orange" 
        }
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        info: {
          txt: "Yesssss",
          createdAt: "Default",
          editedAt: "",
        },
        style: { 
          backgroundColor: "orange"  
        }
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        info: {
          txt: "Asaf and Idov!!!!",
          createdAt: "Default",
          editedAt: "",
        },
        style: { 
          backgroundColor: "orange"  
        }
      },
    ];
    return defaultNotes;
  } else return notes;
}

function getNotes() {
  return Promise.resolve(gNotes);
}

function addNewNote(type, txt) {
  var newNote = {
    id: Utils.getRandomId(),
    type,
    isPinnes: false,
    info: {
      txt,
      createdAt: new Date().toLocaleString(),
      editedAt: "",
    },
    style: { 
      backgroundColor: "#ffcc13" 
    }
  };
  gNotes.unshift(newNote);
  Utils.storeToStorage("gNotes", gNotes);
}

function updateNote(updatedNote) {
  updatedNote.info.editedAt = new Date().toLocaleString();
  const noteIdx = gNotes.findIndex((note) => note.id === updatedNote.id);
  gNotes.splice(noteIdx, 1, updatedNote);
  Utils.storeToStorage("gNotes", gNotes);
  console.log("saved...");
}

function deleteNote(noteId){
  const noteIdx = gNotes.findIndex((note) => note.id === noteId);
  gNotes.splice(noteIdx, 1)
  Utils.storeToStorage("gNotes", gNotes);
}

