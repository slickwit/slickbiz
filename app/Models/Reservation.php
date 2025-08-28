<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'reservation_number',
        'customer_id',
        'service_id',
        'price_id',
        'assigned_employee_id',
        'applied_taxes',
        'start_datetime',
        'end_datetime',
        'timezone',
        'guests_count',
        'units_reserved',
        'status',
        'cancellation_reason',
        'source',
        'special_requests',
        'internal_notes',
        'base_price',
        'tax_amount',
        'total_price',
        'price_breakdown',
        'confirmed_at',
        'cancelled_at',
        'checked_in_at',
        'completed_at',
    ];

    protected $casts = [
        'applied_taxes' => 'array',
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
        'base_price' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'total_price' => 'decimal:2',
        'price_breakdown' => 'array',
        'confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'checked_in_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function price(): BelongsTo
    {
        return $this->belongsTo(Price::class);
    }

    public function assignedEmployee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_employee_id');
    }

    public function extras(): HasMany
    {
        return $this->hasMany(ReservationExtra::class);
    }

    // Scopes
    public function scopeUpcoming($query)
    {
        return $query->where('start_datetime', '>', now())
                    ->whereIn('status', ['confirmed', 'pending']);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }
}