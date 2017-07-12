
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

Vue.use(VeeValidate);
Vue.use(VueRouter);

const Home = require('./pages/Home.vue');
const Users = require('./pages/Users.vue');
const EditUser = require('./pages/EditUser.vue');
const AddUser = require('./pages/AddUser.vue');
const InviteUser = require('./pages/InviteUser.vue');
const Error400 = require('./pages/Error400.vue');
const Error404 = require('./pages/Error404.vue');
const Error401 = require('./pages/Error401.vue');


const routeList = [
    { path: '/', component: Home },
    { path: '/users', component: Users },
    { path: '/users/edit/:id', component: EditUser },
    { path: '/users/add', component: AddUser },
    { path: '/users/invite', component: InviteUser },
    { path: '/400', component: Error400 },
    { path: '/401', component: Error401 },
    { path: '*', component: Error404 }
];
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));

Vue.component('modal', require('./components/Modal.vue'));
Vue.component('alert', require('./components/Alert.vue'))
Vue.component('confirm', require('./components/Confirm.vue'));
Vue.component('preloader', require('./components/Preloader.vue'));
Vue.component('mainnav', require('./components/MainNav.vue'));
Vue.component('tbvue-ajax-dropdown', require('./components/tbvue_ajax_dropdown.vue'));
Vue.component('tbvue-input', require('./components/tbvue_input.vue'));
Vue.component('tbvue-password', require('./components/tbvue_password.vue'));

const router = new VueRouter({
    routes: routeList
});

const remoteRule = {
    getMessage(field, params, data) {
        return field + " already in used";
    },
    validate(value, args) {
        return new Promise(resolve => {
            axios.post(args[0], { value: value }).then(function(response) {
                resolve({ valid: true });
            }).catch(function(error){
                resolve({ valid: false });
            });
        });
    }
}

VeeValidate.Validator.extend('remote', remoteRule);

const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const passregex = {
    getMessage(field, params, data) {
        return "Invalid password strength: (1 Uppercase, 1 Lowercase 1 Number, 1 Special Character)";
    },
    validate(value) {
        return new Promise(resolve => {
            resolve({
                valid: strongRegex.test(value),
            });
        });
    }
};
VeeValidate.Validator.extend('passregex', passregex);

const app = new Vue({
    el: '#app',
    component: ["modal", "alert", "confirm", "preloader", "mainnav"],
    router: router,
    data() {
        return {
            user: { id: null, name: null },
            is_logged: false
        }
    },
    created: function() {
        $(window).resize(function() {
            this.resize();
        }.bind(this));
        axios.interceptors.response.use(null,function (error) {
            // Do something with response error
            this.hidePreloader();
            if(error.response.status==401){
                this.$router.push("/401");
            }else{
                return Promise.reject(error);
            }
         }.bind(this));
    },
    methods: {
        alert: function(event) {
            console.log("HI");
        }
    },
    mounted() {
        console.log("APP INIT");

        this.$router.beforeEach((to, from, next) => {
            this.showPreloader();
            next();
        });
        this.$router.afterEach((to, from) => {
           this.hidePreloader();
        });
        this.$refs.preloader.visible=false;
        this.loadUser();
        this.resize();
        
    },
    methods: {
        loadUser() {
            this.showPreloader();
            axios.get("ajax/user")
			  .then(function (response) {
			  	this.hidePreloader();
			    this.user=response.data;
			  }.bind(this)).catch(function (error) {
			  	this.hidePreloader();
			    console.log(error);
			  }.bind(this));
        },
        resize() {
            $('#app').css({
                overflow: 'hidden',
                height: $(window).height()
            });
            $(".contentHolder").height($(window).height() - $("#mainNav").outerHeight() - parseInt($("#mainNav").css("margin-bottom")));

        },
        showPreloader(){
            this.$refs.preloader.visible=true;
        },
        hidePreloader(){
            this.$refs.preloader.visible=false;
        },
        confirm(title,message,callback){
            return this.$refs.confirm.show(title,message,callback);
        }
    },
    computed:{
        alert(){
            return this.$refs.alert;
        }
    }
    
});
