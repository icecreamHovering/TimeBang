<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weixin extends Model
{
    protected $table = 'weixin';
    //
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nickName', 'avatarUrl','openId'
    ];
}
