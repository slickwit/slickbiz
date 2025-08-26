<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_id',
        'loyalty_points',
        'preferences',
        'notes',
    ];

    protected $casts = [
        'preferences' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}