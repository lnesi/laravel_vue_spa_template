export default {
    data() {
        return {
            singular: "item",
            resource_url: null
        }
    },
    methods: {
        delete(id) {
            this.$root.showPreloader();
            axios.delete(this.resource_url + "/" + id).then(function(response) {
                this.$root.hidePreloader();
                this.$root.alert.info("The " + this.singular + " has been deleted successfully.");
                this.load();
            }.bind(this)).catch(function(response) {
                this.$root.hidePreloader();
                console.log(response);
                this.$root.alert.error(response.data.msg);
            }.bind(this));
        },

        trash(item) {
            this.$root.confirm("Attention!", "Are you sure you want to delete this " + this.singular + ".", function() {
                this.delete(item.id);
            }.bind(this));
        }
    }
}
