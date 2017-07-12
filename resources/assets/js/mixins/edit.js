export default {
  data(){
    return{
      resource_url:null,
      singular:"item",
      item:{}
    }
  },
  mounted(){
    this.load(this.$route.params.id);
  },

  methods:{
    load(id){
          this.$root.showPreloader();
          axios.get(this.resource_url+"/"+id).then(function(response){
              this.$root.hidePreloader();
              this.item=response.data;    
          }.bind(this)).catch(function(response){
              this.$router.push('/404');
          }.bind(this));
      },
      save() {
          this.$root.showPreloader();
          axios.put(this.resource_url+"/"+this.item.id, this.item).then(function(response){
              this.$root.hidePreloader();
              this.$root.alert.success("The  "+this.singular+" has been updated successfully");
          }.bind(this));
      }
  }
}