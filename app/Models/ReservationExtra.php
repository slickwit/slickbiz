<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationExtra extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'extras_item_id',
        'applied_taxes',
        'quantity',
        'unit_price',
        'total_price',
        'price_breakdown',
    ];

    protected $casts = [
        'applied_taxes' => 'array',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'price_breakdown' => 'array',
    ];

    // Relationships
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    public function extrasItem(): BelongsTo
    {
        return $this->belongsTo(ExtrasItem::class);
    }
}