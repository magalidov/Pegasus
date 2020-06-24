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
          createdAt: "25/6/2020,20:00",
          editedAt: "",
          isOnEdit:false,
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
          createdAt: "25/6/2020,20:00",
          editedAt: "",
          isOnEdit:false,
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
          createdAt:"25/6/2020,20:00",
          editedAt: "",
          isOnEdit:false,
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
          createdAt: "25/6/2020,20:00",
          editedAt: "",
          isOnEdit:false,
        },
        style: { 
          backgroundColor: "orange"  
        }
      },
      {
        id: Utils.getRandomId(),
        type: "noteImage",
        isPinned: true,
        info: {
          url: "https://media.gettyimages.com/photos/donkey-on-laughing-on-field-against-dry-plants-picture-id667764513?s=612x612",
          createdAt: "25/6/2020,20:00",
          editedAt: "",
          isOnEdit:false,
        },
        style: { 
          backgroundColor: "orange"  
        }
      },
      {
        id: Utils.getRandomId(),
        type: "noteVideo",
        isPinned: true,
        info: {
          url: "https://www.youtube.com/embed/tgbNymZ7vqY",
          createdAt: "25/6/2020,20:00",
          editedAt: "",
          isOnEdit:false,
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
    isPinned: false,
    isOnEdit:false,
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

