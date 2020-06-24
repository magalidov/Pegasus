export default {
  props: ["info"],
  template: `
        <section class="note-txt-item" :info="info"> 
            <i class="fas fa-thumbtack"></i>
             {{info.txt}}

        </section>
    `,
  //   data() {},
  //   created() {},
  computed: {},
  methods: {},
  components: {},
};