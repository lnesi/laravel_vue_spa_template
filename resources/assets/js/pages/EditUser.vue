<template>
	<div class="container">
        <div class="row">
            <div class="col-md-12">
              <form  @submit="validateForm()" onsubmit="return false;">
                <div class="panel panel-default">
                    <div class="panel-heading">Edit User</div>

                    <div class="panel-body">
                     
                        <tbvue-input name="name" id="in_name" placeholder="Name" rules="required|max:100" v-model="item.name">Name</tbvue-input>
                        <tbvue-input name="name" id="in_abbr"  placeholder="Email" rules="required|email" v-model="item.email" :disabled="true">Email</tbvue-input>
                    	
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
        data: function() {
            return {
                item: { id: null, name: null, email: null, password: null,partner:{name:''},is_admin:false },
                isValidForm:false
            }
        },
        mounted() {
            this.load(this.$route.params.id);
        },
        
        methods: {
            load(id) {
                this.$root.showPreloader();
                axios.get("ajax/admin/users/"+id).then(function(response){
                    this.$root.hidePreloader();
                    this.item = response.data;
                }.bind(this)).catch(function(response){
                    this.$router.push('/400');
                }.bind(this));
            },
            save() {
                this.$root.showPreloader();
                axios.put("ajax/admin/users/"+this.item.id, this.item).then(function(response){
                    this.$root.hidePreloader();
                    this.$root.alert.success("The  User has been updated successfully");
                }.bind(this));
            },
            validateForm() {
                this.isValidForm=true;
                this.$children.forEach(function(element){
                  if(element.isInput){
                    element.validate();
                    if(this.isValidForm)this.isValidForm=element.isValid;
                  }
                }.bind(this));

                if(this.isValidForm){
                    this.save();
                }else{
                  this.$root.$refs.alert.error("Please complete before continue");
                }
            }
        }
    }

</script>