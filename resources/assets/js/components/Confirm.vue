<template>
    <div class="modal fade" id="ConfirmModal" tabindex="-1" role="dialog" aria-labelledby="ConfirmModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="ConfirmModalLabel" v-html="title"></h4>
          </div>
          <div class="modal-body" v-html="body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-fw fa-times"></i> No</button>
            <button type="button" class="btn btn-success" @click="confirm()"><i class="fa fa-fw fa-check"></i> Yes</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
       

        data(){
            return {
                title:"Title",
                body:"HTML body",
                callback:null
            }
        },

        methods:{
            show(title,body,callback){
                this.title=title;
                this.body=body;
                this.callback=callback;
                $("#ConfirmModal").modal("show");
            },

            hide(){
             $("#ConfirmModal").modal("hide");   
            },

            confirm(){
                console.log("confirm",this.callback)
                if(this.callback) this.callback();
                this.hide();
            }
        }


    }
</script>
