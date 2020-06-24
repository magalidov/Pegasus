import { Utils } from "../../../services/utils.service.js";

export const noteService = {
  getNotes,
  addNewNote,
};

var gNotes = _createNotes();

function _createNotes() {
  const notes = Utils.loadFromStorage("gNotes");
  if (!notes) {
    let defaultNotes = [
      {
        type: "noteText",
        isPinned: true,
        info: {
          txt: "First Note",
        },
      },
      {
        type: "noteText",
        isPinned: true,
        info: {
          txt: "Second Note",
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
    type,
    isPinnes:false,
    info: {
      txt: txt,
    },
  };
  gNotes.unshift(newNote);
  Utils.storeToStorage("gNotes", gNotes);
}
