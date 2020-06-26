import { Utils } from "../../../services/utils.service.js";

export const noteService = {
  getNotes,
  addNewNote,
  updateNote,
  deleteNote,
  updateNoteStatus,
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
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          todos: [
            {
              id: Utils.getRandomId(),
              txt: "Learn Routes in Vue",
              isDone: false,
              doneAt: null,
            },
            {
              id: Utils.getRandomId(),
              txt: "Learn Javascript",
              isDone: false,
              doneAt: null,
            },
            {
              id: Utils.getRandomId(),
              txt: "Learn Python",
              isDone: false,
              doneAt: null,
            },
          ],
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteAudio",
        isPinned: true,
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          url:
            "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3",
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: false,
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "First Note",
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "Second Note",
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "Yesssss",
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteText",
        isPinned: true,
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          txt: "Asaf and Idov!!!!",
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteImage",
        isPinned: true,
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          url:
            "https://media.tenor.com/images/6afb17492c5b0a711b51afe70e24d3c4/tenor.gif",
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
      {
        id: Utils.getRandomId(),
        type: "noteVideo",
        isPinned: true,
        createdAt: new Date().toLocaleString(),
        editedAt: "",
        isOnEdit: false,
        info: {
          url: "https://www.youtube.com/embed/tgbNymZ7vqY",
        },
        style: {
          backgroundColor: "#fa9c00",
        },
      },
    ];
    return defaultNotes;
  } else return notes;
}
function _getNoteIdx(noteId) {
  return gNotes.findIndex((note) => note.id === noteId);
}

function getNotes() {
  return Promise.resolve(gNotes);
}

function addNewNote(type, info) {
  var newNote = {
    id: Utils.getRandomId(),
    type,
    isPinned: false,
    createdAt: new Date().toLocaleString(),
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
  const noteIdx = _getNoteIdx(updatedNote.id);
  gNotes.splice(noteIdx, 1, updatedNote);
  Utils.storeToStorage("gNotes", gNotes);
}

function deleteNote(noteId) {
  const noteIdx = _getNoteIdx(noteId);
  gNotes.splice(noteIdx, 1);
  Utils.storeToStorage("gNotes", gNotes);
}

function updateNoteStatus(noteId) {
  const noteIdx = _getNoteIdx(noteId);
  gNotes[noteIdx].isPinned = !gNotes[noteIdx].isPinned;
}
