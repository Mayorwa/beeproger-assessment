<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('items')->name('item.')->group(function () {
    Route::get('/get-all', [ItemController::class, 'getAllItems'])->name('getAllItems');
    Route::put('/mark-as-complete', [ItemController::class, 'markItemAsComplete'])->name('markItemAsComplete');
    Route::post('/create', [ItemController::class, 'createAnItem'])->name('createAnItem');
    Route::get('/{item_id}', [ItemController::class, 'getOneItem'])->name('getOneItem');
    Route::put('/{item_id}', [ItemController::class, 'updateAnItem'])->name('updateAnItem');
    Route::delete('/{item_id}', [ItemController::class, 'deleteAnItem'])->name('deleteAnItem');
});
