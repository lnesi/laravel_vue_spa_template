<template>
   <nav class="navbar navbar-default navbar-fixed-top" id="mainNav">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="#/">
                        <i class="lnr lnr-code"></i> APP<small></small>
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        <li class=""><a href="#/"><span class="lnr lnr-home"></span> Home</a></li>
                       
                        <li class="dropdown" v-show="user.is_admin">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog fa-fw"></i> Admin <span class="caret"></span></a>
                              <ul class="dropdown-menu">
                                
                                <li><a href="#/users"><i class="fa fa-fw fa-users"></i> Users</a></li>
                              </ul>
                        </li>
                        
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                          <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <i class="fa fa-user fa-fw"></i> {{ user.name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a @click="logout"><i class="lnr lnr-exit"></i> Logout</a>
                                    </li>
                                </ul>
                            </li>

                    </ul>
                </div>
            </div>
        </nav>
</template>

<script>
    export default {
        
        computed: {
           user(){
                return this.$root.user;
           },

        },
        methods:{
            logout(){
                axios.post("/logout").then(function (response) {
                    console.log("ahi vamos",response);
                    window.location.href="/";

                }.bind(this));
            }


        }
    }
</script>
