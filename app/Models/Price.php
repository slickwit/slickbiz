<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Price extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'service_id',
        'pricing_model_id',
        'amount',
        'min_amount',
        'max_amount',
        'min_quantity',
        'max_quantity',
        'valid_from',
        'valid_until',
        'is_active',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'min_amount' => 'decimal:2',
        'max_amount' => 'decimal:2',
        'min_quantity' => 'integer',
        'max_quantity' => 'integer',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function pricingModel(): BelongsTo
    {
        return $this->belongsTo(PricingModel::class);
    }
}
