export default {
	mounted(){
		
		this.load();
	},
	data(){
			return {
				resource_url:"",
				list: {data:[]},
			}
	},
	filters: {
        uppercase: function(value) {
            if (!value) return '';
            value = value.toString();
            return value.toUpperCase();
        }
    },
	methods:{
	
		load() {
            this.$root.showPreloader();
            axios.get(this.resource_url).then(function(response){
                this.list = response.data;
                this.$root.hidePreloader();
            }.bind(this)).catch(function(error){
            	console.log("[Axios Error]:", error);
            });
        },


		
	}
}