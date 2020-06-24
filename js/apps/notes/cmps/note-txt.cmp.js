import { noteService } from "../services/note-service.js";

export default {
  props: ["note"],
  template: `
        <section class="note-txt-item" :note="note"> 
            <i class="fas fa-thumbtack"></i>
             <textarea v-model="note.info.txt"></textarea>
             <section class="createdAt">{{getNoteChangedTime}}</section>
             <section class="edit-bar flex space-between">
             <i class="fas fa-font"></i>
             <i class="fas fa-palette"></i>
             <i class="fas fa-image"></i>
             <i class="save-icon fas fa-save" @click="onSaveNote"></i>
             </section>

        </section>
    `,
  //   created() {},
  computed: {
    getNoteChangedTime(){
      let info=this.note.info
      if(!info.editedAt)return 'Created:'+info.createdAt
      else return 'Edited:'+info.editedAt
    },
  },
  methods: {
    onSaveNote() {
      noteService.updateNote(this.note.id, { ...this.note });
    },
  },
  components: {},
};
