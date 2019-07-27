<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ResumeList extends Model
{
    //
    //
    protected $table = 'resume_list';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'realName', 'position','tel','email','tags','sid','remark'
    ];
}
