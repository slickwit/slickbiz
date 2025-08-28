<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PricingModel extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'calculation_type',
        'unit',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function prices(): HasMany
    {
        return $this->hasMany(Price::class);
    }
}
