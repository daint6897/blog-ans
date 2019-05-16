<?php

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
Route::get('/', function () {
    $threads=App\Thread::paginate(15);
    return view('welcome',compact('threads'));
});

Auth::routes();

Route::get('/home', 'HomeController@index');

Route::get('thread/search','ThreadController@search');

Route::get('cmtThread/{cmt}','ThreadController@showCmt');

Route::post('/thread/mark-as-solution','ThreadController@markAsSolution')->name('markAsSolution');
Route::resource('/thread','ThreadController');


Route::resource('comment','CommentController',['only'=>['update','destroy']]);

Route::post('comment/create/{thread}','CommentController@addThreadComment');

Route::post('reply/create/{comment}','CommentController@addReplyComment')->name('replycomment.store');


Route::post('comment/like','LikeController@toggleLike')->name('toggleLike');

Route::get('/user/profile/{user}', 'UserProfileController@index')->name('user_profile')->middleware('auth');

Route::get('/markAsRead',function(){
    auth()->user()->unreadNotifications->markAsRead();
});

Route::get("/<path to resource>", function () {
    $r = Response::make("hello");
    $r->header("Access-Control-Allow-Origin", "<*|client request domain>")
    ->header("Access-Control-Allow-Credentials", "true")
    ->header("Access-Control-Request-Method", "GET");
});
