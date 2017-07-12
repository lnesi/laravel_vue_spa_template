export default {
    data() {
        return {
            singular: "item",
            resource_url:null
        }
    },
    methods: {
        toggleActive(id, method) {
            this.$root.showPreloader();
            axios.get(this.resource_url+'/' + id + "/" + method).then(function(response) {
                this.$root.hidePreloader();
                this.$root.alert.success("The "+this.singular+" has been " + method + "d successfully");
            }.bind(this)).catch(function(error) {
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
        activate(item) {
            this.$root.confirm("Attention!", "Are you sure you want to activate this " + this.singular + ".", function() {
                this.toggleActive(item.id, "activate");
                item.active = true;
            }.bind(this));
        },
        deactivate(item) {
            this.$root.confirm("Attention!", "Are you sure you want to deactivate this " + this.singular + ".", function() {
                this.toggleActive(item.id, "deactivate");
                item.active = false;
            }.bind(this));
        },
    }
}
