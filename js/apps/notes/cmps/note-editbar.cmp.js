import { eventBus } from "../../../services/event-bus.service.js";
import colorPicker from "../cmps/note-colorpick.cmp.js";

export default {
  props: ["note"],
  template: `
        <section class="edit-bar flex space-around ">
                <i class="fas fa-trash" @click="onDeleteNote"></i>
                <i class="fas fa-palette" @click="openColor" @blur="openColor"></i>
                <color-picker v-show="showColorPicker" @setColor="onSetColor" />
                <i class="fas fa-edit" @click="onEdit"></i>
                <i class="fas fa-envelope" @click="sendAsEmail"></i>
        </section>
    `,
  data() {
    return {
      noteColor: this.note.style.backgroundColor,
      showColorPicker: false,
    };
  },
  methods: {
    onUpdateNote() {
      this.note.style.backgroundColor = this.noteColor;
      eventBus.$emit("update", this.note);
    },
    onDeleteNote() {
      eventBus.$emit("delete", this.note.id);
    },
    onSetColor(color) {
      this.note.style.backgroundColor = color;
      eventBus.$emit("update", this.note);
    },
    onEdit() {
      if (this.note.type === "noteText") eventBus.$emit(`edit-${this.note.id}`);
      let editMode = this.note.isOnEdit;
      this.note.isOnEdit = !editMode;
    },
    openColor() {
      this.showColorPicker = !this.showColorPicker;
    },
    sendAsEmail() {
      let messegeContent;
      if (this.note.type === "noteText") messegeContent = this.note.info.txt;
      else if (this.note.type === "noteTodo") {
        messegeContent = this.note.info.todos.map((todo,idx)=>{
          return`${idx}. ${todo.txt}\n`
        }).join(',');
      } else messegeContent = this.note.info.url;
      this.$router.push(`/email/compose/new?type=${this.note.type}&body=${messegeContent}&title=${this.note.info.title}`);
    },
  },
  components: {
    colorPicker,
  },
};
