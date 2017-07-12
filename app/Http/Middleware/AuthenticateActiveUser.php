<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
class AuthenticateActiveUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next,$guard=null)
    {
        if($request->user()->active){
            return $next($request);
        }else{
            Auth::guard($guard)->logout();
            return response(view("auth.inactive_user"),401);
        }
        
    }
}
