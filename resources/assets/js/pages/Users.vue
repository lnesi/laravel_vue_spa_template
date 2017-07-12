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
var delete_mix = require('../mixins/delete.js').default;
var activation_mix = require('../mixins/activation.js').default;
export default {
    mixins: [list_mix, delete_mix, activation_mix],

    created: function() {
        this.resource_url = "ajax/admin/users";
        this.singular = "user";
        this.addObject = { name: "", email: "", partner_id: "", password: "" };

    },
    methods: {
        reinvite(item) {
            this.$root.$emit("SHOW_PRELOADER");
            this.$http.get('/ajax/admin/users/' + item.id + "/resendinvite").then(response => {
                this.$root.$emit("HIDE_PRELOADER");
                this.$root.$emit("ALERT", "Ok!", "The invite has sent successfully", "success", 3);
            }, response => {
                this.$root.$emit("HIDE_PRELOADER");
                console.log(response);
                this.$root.$emit("ALERT", response.status + " Error!", response.body.message, "danger");
            });
        }


    }

}
</script>