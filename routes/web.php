<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourierController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [CourierController::class, 'index'])->name("couriers.index");
Route::get('/couriers/sort', [CourierController::class, 'sort'])->name("couriers.sort");

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
