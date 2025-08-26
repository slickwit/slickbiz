<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'identification',
        'position',
        'hourly_rate',
        'hire_date',
        'termination_date',
        'permissions',
        'notes',
    ];

    protected $casts = [
        'permissions' => 'array',
        'hire_date' => 'date',
        'termination_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}