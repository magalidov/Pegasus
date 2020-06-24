export const noteService = {
  getNotes,
  addNewNote,
};
var notes = [
  {
    type: "NoteText",
    isPinned: true,
    info: {
      txt: "First Note",
    }
  },
  {
    type: "NoteText",
    isPinned: true,
    info: {
      txt: "Second Note",
    }
  },
];

function getNotes() {
  return Promise.resolve(notes);
}

function addNewNote() {}
