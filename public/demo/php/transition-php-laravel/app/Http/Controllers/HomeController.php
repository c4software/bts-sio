<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function hello(Request $request)
    {
        $name = $request->input('name');
        return view('hello', ['name' => $name]);
    }
}
