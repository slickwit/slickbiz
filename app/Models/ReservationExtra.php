<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReservationExtra extends BaseModel
{
    use SoftDeletes;


    public function extras(): BelongsToMany
    {
        return $this->belongsToMany(ExtrasItem::class, 'reservation_extras')
            ->withPivot('quantity', 'unit_price', 'total_price', 'price_breakdown')
            ->withTimestamps();
    }
}
