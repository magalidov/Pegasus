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
        type: "noteTodo",
        isPinned: false,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          todos: [
            { txt: "Learn Routes in Vue", isDone: false, doneAt: null },
            { txt: "Learn Javascript", isDone: false, doneAt: null },
            { txt: "Learn Python", isDone: false, doneAt: null },
          ],
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteAudio",
        isPinned: false,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: false,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "First Note",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: false,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "Second Note",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "Yesssss",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "Asaf and Idov!!!!",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteImage",
        isPinned: true,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          url:
            "https://media.gettyimages.com/photos/donkey-on-laughing-on-field-against-dry-plants-picture-id667764513?s=612x612",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteVideo",
        isPinned: true,
        createdAt: "25/6/2020,20:00",
        editedAt: "",
        isOnEdit: false,
        info: {
          url: "https://www.youtube.com/embed/tgbNymZ7vqY",
        },
        style: {
          backgroundColor: "orange",
        },
      },
    ];
    return defaultNotes;
  } else return notes;
}

function getNotes() {
  return Promise.resolve(gNotes);
}

function addNewNote(type, info) {
  var newNote = {
    id: Utils.getRandomId(),
    type,
    isPinned: false,
    createdAt: "25/6/2020,20:00",
    editedAt: "",
    isOnEdit: false,
    info,
    style: {
      backgroundColor: "#ffcc13",
    },
  };
  gNotes.unshift(newNote);
  Utils.storeToStorage("gNotes", gNotes);
}

function updateNote(updatedNote) {
  updatedNote.editedAt = new Date().toLocaleString();
  const noteIdx = gNotes.findIndex((note) => note.id === updatedNote.id);
  gNotes.splice(noteIdx, 1, updatedNote);
  Utils.storeToStorage("gNotes", gNotes);
}

function deleteNote(noteId) {
  const noteIdx = gNotes.findIndex((note) => note.id === noteId);
  gNotes.splice(noteIdx, 1);
  Utils.storeToStorage("gNotes", gNotes);
}
