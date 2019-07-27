<?php

namespace App\Api\Controllers;

use App\Weixin;
use App\Source;
use App\ResumeList;
use Illuminate\Http\Request;

class WeixinController extends BaseController
{
    //

    public function getResumeList(Request $request){

        if(empty($request['data'])){
            $data = ResumeList::select(['realName', 'position','tel','email','tags','sid','remark','updated_at','id'])->orderBy('updated_at','desc')->get();

            return  array([
                'code'=>200,
                'message'=>'success',
                'data'=>$data,
                'search'=>false
            ]);
        }else {
            $query = $request['data'];

            $data = ResumeList::select(['realName', 'position','tel','email','tags','sid','remark','updated_at','id'])->whereRaw ("concat(`realName`,`position`,`tel`,`email`,`tags`,`remark`) like '%".$query."%'")->orderBy('updated_at','desc')->get();

            return  array([
                'code'=>200,
                'message'=>'success',
                'data'=>$data,
                'search'=>true
            ]);
        }

    }
    public function getSourceList(){
        $data = Source::select(['netName','status','code','count','updated_at','id'])->orderBy('updated_at','desc')->get();

        return  array([
            'code'=>200,
            'message'=>'success',
            'data'=>$data
        ]);
    }

    public function  addAccount(Request $request)
    {
        $netName = $request['netName'];
        $account = $request['account'];
        $password = $request['password'];
        $openid = $request['openid'];
        $user = Weixin::where('openId',$openid)->first();
        $uid = $user['id'];

        $result = Source::where('netName',$netName)->where('account',$account)->get();

        if(sizeof($result) ===0){
            Source::create([
                'netName'=>$netName,
                'account'=>$account,
                'password'=>$password ,
                'uid'=>$uid,
                'count'=>'待获取',
                'status'=>'核验中',
                'code'=>'vip00'.$uid
            ]);
            return array([
                'code'=>200,
                'message'=>'添加成功'
            ]);
        }else {
            return array([
                'code'=>500,
                'message'=>'账号已存在'
            ]);
        }


    }
    /*
     * 更新标签
     * */
    public function updateTag(Request $request){
        $id=$request['id'];
        $tags=$request['tags'];
        $remark=$request['remark'];

        $data = ResumeList::where('id',$id)->update(['tags'=>$tags,'remark'=>$remark]);

        return  array([
            'code'=>200,
            'message'=>'success',
            'data'=>$data
        ]);
    }
    /*
 * 更新简历
 * */
    public function updateDate(Request $request){
        $id=$request['id'];
        $data = Source::where('id',$id)->update(['count'=>'待更新']);
        return  array([
            'code'=>200,
            'message'=>'success',
            'data'=>$data
        ]);
    }
    /*
  * 删除简历
  * */
    public function delNet(Request $request){
        $id=$request['id'];
        $data = Source::where('id',$id)->delete();;
        return  array([
            'code'=>200,
            'message'=>'success',
            'data'=>$data
        ]);
    }
}







