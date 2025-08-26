<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserProfile extends BaseModel
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'avatar_url',
        'timezone',
        'preferred_language',
    ];
    protected $appends = ['fullname'];

    public function getFullnameAttribute()
    {
        if(isset($this->attributes['first_name']) && isset($this->attributes['last_name'])) {
			return trim($this->attributes['first_name']) . ' ' . trim($this->attributes['last_name']);
		}
		return null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}