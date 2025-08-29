<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ServiceExtras extends Pivot
{
    
    protected $fillable = [
        'service_id',
        'extras_group_id',
        'is_required',
        'max_selectable',
    ];

    protected $casts = [
        'is_required' => 'boolean',
    ];
}