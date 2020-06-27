import { eventBus } from "../../../services/event-bus.service.js";
import { Utils } from "../../../services/utils.service.js";

export default {
  template: `
    <section class="note-add col-layout">
      <section class="flex">
          <input ref="newNoteInput" @keyup.enter.prevent="onAddNote" type="text"
                 placeholder="Take a note..." @focus="isFocused = true" />
      </section>
          <ul class="cmp-options clean-list flex" v-if="isFocused">
            <li class="selected" ref="noteText" @click="setNoteType('noteText')"><i class="fas fa-font"></i></li>
            <li ref="noteImage" @click="setNoteType('noteImage')"><i class="fas fa-camera-retro" ></i></li>
            <li ref="noteAudio" @click="setNoteType('noteAudio')"><i class="fas fa-volume-up"></i></li>
            <li ref="noteTodo" @click="setNoteType('noteTodo')"><i class="fas fa-list"></i></li>
            <li ref="noteVideo" @click="setNoteType('noteVideo')"><i class="fab fa-youtube" ></i></li>
          </ul>
    </section>
    `,
  data() {
    return {
      notesType: [
        {
          type: "noteText",
          inputText: "Take a note...",
        },
        {
          type: "noteImage",
          inputText: "Paste an Image Url... ",
        },
        {
          type: "noteVideo",
          inputText: "Paste a YOUTUBE link",
        },
        {
          type: "noteTodo",
          inputText:
            "Make a list so you won't forget (Syntax='todo,todo,todo...)",
        },
        {
          type: "noteAudio",
          inputText: "Paste an audio Url...",
        },
      ],
      selNote: { type: "noteText" },
      info: null,
      isFocused: false,
    };
  },
  methods: {
    setNoteType(type) {
      this.selNote = this.notesType.find((note) => note.type === type);
      this.$refs["newNoteInput"].placeholder = this.selNote.inputText;
      this.$refs["newNoteInput"].value = "";
      this.setSelectedButton(type);
    },
    onAddNote() {
      const selected = this.selNote.type;
      const userContent = this.$refs["newNoteInput"].value;
      if (!userContent) return;
      if (selected === "noteText") this.info = { txt: userContent };
      if (
        selected === "noteImage" ||
        selected === "noteVideo" ||
        selected === "noteAudio"
      )
        this.info = { url: userContent };

      if (selected === "noteTodo") {
        this.info = { todos: getTodos(userContent) };
      }

      function getTodos(todos) {
        todos = todos.split(",");
        todos = todos.map((todo) => {
          return {
            id: Utils.getRandomId(),
            txt: todo,
            isDone: false,
            doneAt: null,
          };
        });
        return todos;
      }
      this.$refs["newNoteInput"].value = "";
      eventBus.$emit("add", selected, this.info);
    },
    setSelectedButton(type) {
      let els = this.$refs;
      for (let note in els) {
        els[note].classList.remove("selected");
      }
      this.$refs[type].classList.toggle("selected");
    },
  },
};
