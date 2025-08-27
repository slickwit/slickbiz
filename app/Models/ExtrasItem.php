<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExtrasItem extends BaseModel
{
    use SoftDeletes;
    
    protected $fillable = [
        'extras_group_id',
        'name',
        'description',
        'price',
        'price_type',
        'max_quantity',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(ExtrasGroup::class, 'extras_group_id');
    }

    public function taxes(): BelongsToMany
    {
        return $this->belongsToMany(Tax::class, 'extras_item_taxes');
    }

    public function reservations(): BelongsToMany
    {
        return $this->belongsToMany(Reservation::class, 'reservation_extras')
            ->withPivot('quantity', 'unit_price', 'total_price', 'price_breakdown')
            ->withTimestamps();
    }
}
