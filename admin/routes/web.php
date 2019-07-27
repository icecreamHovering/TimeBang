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
Route::any('/wechat', 'WeChatController@miniProgramLogin');

Route::get('/', function () {
    return view('welcome');
});

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['middleware' => 'cross'], function ($api) {
    $api->group(['namespace' => 'App\Api\Controllers'],function ($api){
        $api->post('weixin', 'WeixinController@save');
        $api->post('addAccount', 'WeixinController@addAccount');
        $api->post('getResumeList','WeixinController@getResumeList');
        $api->get('getSourceList','WeixinController@getSourceList');
        $api->post('updateTag', 'WeixinController@updateTag');
        $api->post('updateDate', 'WeixinController@updateDate');
        $api->post('delNet', 'WeixinController@delNet');
    });

});