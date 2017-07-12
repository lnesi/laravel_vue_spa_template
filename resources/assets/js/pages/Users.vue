<template>
	<div>
      <div class="container">
          <div class="row">
              <div class="col-md-12 ">
                  <div class="panel panel-default">
                      <div class="panel-heading">
                      <h2><i class="lnr lnr-users"></i> Users
                          <div class="btn-group  pull-right">
                          <a href="#/users/invite" class="btn btn-default " ><i class="fa fa-fw fa-send"></i> Invite</a>
                          <a href="#/users/add" class="btn btn-default" ><i class="fa fa-fw fa-plus"></i> Add</a>
                          </div>
                      </h2>
                      
                      </div>

                      <div class="panel-body">
                       
                        <table class="table table-striped table-bordered">
                            <thead>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                             
                              <th>Status</th>
                              <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in list.data">
                                <td>{{item.name}}</td>
                                <td>{{item.email}}</td>
                               
                                <td v-html="getStatus(item.active)"></td>
                                <td>
                                     <div class="btn-group btn-group-xs" role="group" aria-label="...">
                                        <a class="btn btn-default" :href="'#users/edit/'+item.id" ><i class="fa fa-fw fa-edit"></i> <span class="hidden-xs">Edit</span></a>
                                        <button type="button" class="btn btn-default" @click="activate(item)" v-show="!item.is_admin && !item.active"><i class="fa fa-fw fa-toggle-off"></i> <span class="hidden-xs">Activate</span></button>
                                        <button type="button" class="btn btn-default" @click="deactivate(item)" v-show="!item.is_admin && item.active"><i class="fa fa-fw fa-toggle-on"></i> <span class="hidden-xs">Deactivate</span></button>
                                        <button type="button" class="btn btn-default" @click="trash(item)" v-show="!item.is_admin"><i class="fa fa-fw fa-trash"></i> <span class="hidden-xs">Delete</span></button>
                                        <button type="button" class="btn btn-default" v-show="item.invite_token!=null" @click="reinvite(item)" ><i class="fa fa-fw fa-send"></i> re-send Invite</button>
                                     </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
var list_mix = require('../mixins/list.js').default;
export default {
    mixins: [list_mix],
   
    data: function() {
        return {
            validator: null
        }
    },
    created: function() {
        this.resource_url = "ajax/admin/users";
        this.singular = "User";
        this.addObject = { name: "", email: "", partner_id: "", password: "" };

    },
    methods: {
        toggleActive(id,method) {
            this.$root.showPreloader();
            axios.get('/ajax/admin/users/' + id + "/"+method).then(function(response) {
                this.$root.hidePreloader();
                this.$root.alert.success( "The User has been "+method+"d successfully");
            }.bind(this)).catch(function (error){
                this.$root.hidePreloader();
                console.log(response);
                this.$root.alert.error(response.data.msg);
            }.bind(this));
        },
        delete(id) {
            this.$root.showPreloader();

            axios.delete("ajax/admin/users/"+id).then(function(response){
                this.$root.hidePreloader();
                this.$root.alert.info("The " + this.singular + " has been deleted successfully");
                this.load();
            }.bind(this)).catch(function(response){
                this.$root.hidePreloader();
                console.log(response);
                this.$root.alert.error(response.data.msg);
            }.bind(this));
        },
        getStatus: function(value) {
            if (value == 1) {
                return "<span class='label label-success'>Active</span>";
            } else {
                return "<span class='label label-danger'>Inactive</span>";
            }

        },
        trash(item) {
             this.$root.confirm("Attention!", "Are you sure you want to delete the user: <strong>" + item.name + "</strong>?",function(){
                this.delete(item.id);
            }.bind(this));
        },
        activate(item) {
            this.$root.confirm("Attention!", "Are you sure you want to activate the user: <strong>" + item.name + "</strong>?",function(){
                this.toggleActive(item.id,"activate");
                item.active=true;
            }.bind(this));
        },
        deactivate(item) {
            this.$root.confirm("Attention!", "Are you sure you want to deactivate the user: <strong>" + item.name + "</strong>?",function(){
                this.toggleActive(item.id,"deactivate");
                item.active=false;
            }.bind(this));
        },

        reinvite(item){
            this.$root.$emit("SHOW_PRELOADER");
            this.$http.get('/ajax/admin/users/' + item.id + "/resendinvite").then(response => {
                this.$root.$emit("HIDE_PRELOADER");
                this.$root.$emit("ALERT", "Ok!", "The invite has sent successfully", "success", 3);
            }, response => {
                this.$root.$emit("HIDE_PRELOADER");
                console.log(response);
                this.$root.$emit("ALERT", response.status+" Error!", response.body.message, "danger");
            });
        }


    }

}

</script>