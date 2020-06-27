import { noteService } from "../services/note-service.js";
import {eventBus} from '../../../services/event-bus.service.js';
import noteItem from "../cmps/note-item.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import noteAdd from "../cmps/note-add.cmp.js";

export default {
  template: `
        <div class="notes-app">
          <main>
              <note-filter @filter="setFilter"/>
              <note-add/>
              <div class="cmp-container">
                  <section class="pinned-notes">
                  <h1>PINNED:</h1>
                  <note-item v-for="note in pinnedNotes" :note="note" ></note-item>
                  <h2 v-if="checkPinned">No Pinned Notes</h2>
                  </section>
                  <section ref="notes" class="notes">
                    <h1>OTHERS:</h1>
                    <note-item v-for="note in notesToShow" :note="note" ></note-item>
                  </section>
              </div>
          </main>
        </div>

    `,
  data() {
    return {
      notes: [],
      pinnedNotes: [],
      filterBy: null,
    };
  },

  created() {
    this.getNotes();
    eventBus.$on("delete", (noteId) => {
      noteService.deleteNote(noteId);
      this.getNotes();
      eventBus.$emit('message','Note Deleted.','bad-msg')
    });
    eventBus.$on("add", (type, info) => {
      noteService.addNewNote(type, info);
      this.getNotes();
      eventBus.$emit('message','Success, Note added !','good-msg')
      this.$refs['notes'].scrollIntoView()
    });
    eventBus.$on("update", (note) => {
      noteService.updateNote(note);
      this.getNotes();
    });
    eventBus.$on("pinStat", (noteId) => {
      noteService.updateNoteStatus(noteId);
      this.getNotes();
    });    
  },
  computed: {
    notesToShow() {
      const filterBy = this.filterBy;
      if (!filterBy) return this.notes;
      let filteredNotes = this.notes.filter((note) => {
        if (filterBy.type === "all") return true;
        else return note.type === filterBy.type;
      });
      filteredNotes = filteredNotes.filter((note) => {
        if (filterBy.txt === "") return true;
        if (note.type === "noteTodo") {
          return note.info.todos.some((todo) =>
            todo.txt.toLowerCase().includes(filterBy.txt)
          );
        }
        if (note.type !== "noteText") return false;
        else return note.info.txt.toLowerCase().includes(filterBy.txt);
      });
      return filteredNotes;
    },
    checkPinned() {
      return this.pinnedNotes.length === 0;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    getNotes() {
      noteService.getNotes().then((notes) => {
        this.notes = notes.filter((note) => !note.isPinned);
        this.pinnedNotes = notes.filter((note) => note.isPinned);
      });
    },
  },
  components: {
    noteItem,
    noteFilter,
    noteAdd,
  },
};
