<?php

namespace App\Http\Controllers;


use Log;
use EasyWeChat\Factory;
use Illuminate\Http\Request;

use App\Weixin;

class WeChatController extends Controller
{

    /**
     * 处理微信的请求消息
     *
     * @return string
     */
    public function serve()
    {
        Log::info('request arrived.'); # 注意：Log 为 Laravel 组件，所以它记的日志去 Laravel 日志看，而不是 EasyWeChat 日志

        $app = app('wechat.official_account');
        $app->server->push(function($message){
            return "欢迎关注 overtrue！";
        });

        return $app->server->serve();
    }

    public function miniProgramLogin(Request $request)
    {
        $config = config('wechat.mini_program.default');
        $app = Factory::miniProgram($config);
        $code = $request->get('code', '');
        $iv = $request->get('iv');
        $encryptedData = $request->get('encryptedData');
        $result = $app->auth->session($code);
        $hasData = Weixin::where('openId',$result['openid'])->first();
        $session = $result['session_key'];
        $decryptedData = $app->encryptor->decryptData($session, $iv, $encryptedData);

        if(empty($hasData)){
            $weixin = new Weixin;
            $weixin->nickName=$decryptedData['nickName'];
            $weixin->avatarUrl=$decryptedData['avatarUrl'];
            $weixin->openId=$decryptedData['openId'];
            $weixin->save();
            return $result['openid'];
        }
    }
}