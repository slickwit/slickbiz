<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ServiceTax extends Pivot
{
    protected $table = 'service_taxes';
    public $timestamps = true;
}

class ExtrasItemTax extends Pivot
{
    protected $table = 'extras_item_taxes';
    public $timestamps = true;
}

class ServiceExtras extends Pivot
{
    protected $table = 'service_extras';
    public $timestamps = true;
    
    protected $fillable = [
        'service_id',
        'extras_group_id',
        // 'is_required',
        // 'max_selectable',
    ];

    protected $casts = [
        'is_required' => 'boolean',
    ];
}