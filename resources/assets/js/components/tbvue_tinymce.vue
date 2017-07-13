<template>
	<div :class="{'form-group': true, 'has-error': hasErrors }">
		<label :for="id" class="control-label"><slot></slot></label>
		<textarea type="text" class="form-control custom" :name="name" :id="id"></textarea>
		<p class="help-block">{{ errorsBag.first(this.name) }}</p>
	</div>
</template>
<script>
export default {
    data() {
        return {
            valueModel: null,
            editor: null,
            validator: null,
            isInput:true,
        }
    },
    created() {
        this.validator = new VeeValidate.Validator();
        this.validator.attach(this.name, this.rules, { prettyName: this.$slots.default[0].text });
    },
    mounted() {

        if (this.value) this.valueModel = this.value;
        this.editor = new tinymce.Editor(this.id, {
            menubar: 'edit insert view format',
            plugins: ["link", "table", "wordcount", "code"],
            toolbar: "bold italic | alignleft aligncenter alignright | blockquote | link unlink  | bullist numlist outdent indent | table  | code",
            skin_url: '/skin',
            forced_root_block: "",
            force_p_newlines: false,
            height: 300
        }, tinymce.EditorManager);
        this.editor.render();
      
        if (this.value) this.editor.setContent(this.value);
    },
    methods: {
        getValue() {

            return this.editor.getContent();
        },
        validate(){
        	this.valueModel=this.editor.getContent();
        	this.$emit('input', this.valueModel);
            console.log("VALIDATING TINYMCE");
            this.validator.validate(this.name, this.valueModel).then(() => {
               
                // success
            }).catch(() => {
                
                // failed
            });
            this.$set(this, 'errors', this.validator.errorBag);
        }
    },
    watch: {
        value(val) {
            console.log("value prop", val);
            if (val) this.editor.setContent(val);
        }
    },
    computed: {
        errorsBag() {
            return this.validator.errorBag;
        },
        hasErrors(){
          return this.errorsBag.has(this.name);
        },
        isValid(){
          return this.errorsBag.errors.length==0;
        }
    },
    props: {
        value: { default: null },
        id: { type: String, required: true },
        name: { type: String, required: true },
        rules: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
    }
}

</script>
