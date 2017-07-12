<template>
	<div class="container">
        <div class="row">
            <div class="col-md-12">
              <form  @submit="validate()" onsubmit="return false;">
                <div class="panel panel-default">
                    <div class="panel-heading">Add User</div>

                    <div class="panel-body">
                        <tbvue-input name="name" id="in_name" placeholder="Name" rules="required|max:100" v-model="addObject.name">Name</tbvue-input>
                        <tbvue-input name="name" id="in_email"  placeholder="Email" rules="required|email|remote:ajax/admin/users/validate" v-model="addObject.email">Email</tbvue-input>
                    </div>
                    <div class="panel-footer">
                        <a  class="btn btn-default" href="#/users" ><i class="fa fa-fw fa-chevron-left"></i> Back</a>
                        <button type="submit"   :class="{'btn btn-success pull-right': true, 'disabled': !isValidForm }"><i class="fa fa-fw fa-floppy-o" ></i> Save</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
    data() {
            return {
                addObject: {
                    name: '',
                    email: ''
                },
                isValidForm: false
            }
        },
        computed: {
            hasErrors: function() {
                return false;
            }
        },

        methods: {
            validate() {
                this.isValidForm = true;
                this.$children.forEach(function(element) {
                    if (element.isInput) {
                        element.validate();
                        if (this.isValidForm) this.isValidForm = element.isValid;
                    }
                }.bind(this));

                if (this.isValidForm) {
                    this.sendInvitation();
                } else {
                    this.$root.$refs.alert.error("Please complete before continue");
                }
            },
            sendInvitation() {
                this.$root.showPreloader();

                axios.post('/ajax/admin/users/invite', this.addObject).then(function(response){
                    this.$root.hidePreloader();
                    this.$parent.$router.push('/users/');
                    this.$root.alert.success("The invitation has been sent successfully");
                }.bind(this)).catch(function(response){
                    this.$root.hidePreloader();
                    console.log("Error");
                }.bind(this));

            },
        }
  }

</script>