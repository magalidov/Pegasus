import { Utils } from "../../../services/utils.service.js";

export const noteService = {
  getNotes,
  addNewNote,
  updateNote,
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
  };
  gNotes.unshift(newNote);
  Utils.storeToStorage("gNotes", gNotes);
}

function updateNote(noteId, updatedNote) {
  updatedNote.info.editedAt = new Date().toLocaleString();
  const noteIdx = gNotes.findIndex((note) => note.id === noteId);
  gNotes.splice(noteIdx, 1, updatedNote);
  Utils.storeToStorage("gNotes", gNotes);
  console.log("saved...");
}


