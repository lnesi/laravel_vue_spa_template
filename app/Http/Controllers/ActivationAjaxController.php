<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ActivationAjaxController extends CrudAjaxController
{
    //
    public function activate(Request $request,$id){
    	$item=call_user_func($this->modelClass."::findOrFail",$id);
    	$item->active=true;
    	$item->save();
		return $item;
    }

    public function deactivate(Request $request,$id){
    	$item=call_user_func($this->modelClass."::findOrFail",$id);
    	$item->active=false;
    	$item->save();
		return $item;
    }
}
