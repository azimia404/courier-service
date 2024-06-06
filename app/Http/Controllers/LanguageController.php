<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function setLang(string $locale){
        if (! in_array($locale, ['en', 'ru'])) {
            abort(400);
        }
     

        Session::put('locale', $locale);
        App::setLocale($locale);
        return redirect()->back();
        // ...
    }
}
