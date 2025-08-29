<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'slug',
        'description',
        'min_capacity',
        'max_capacity',
        'features',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function price(): HasOne
    {
        return $this->hasOne(Price::class);
    }

    public function conditionalPricings(): HasMany
    {
        return $this->hasMany(ConditionalPricing::class);
    }

    public function getPriceForDuration(?int $duration = null): float
    {
        $mainPrice = $this->price;
        
        // For fixed/per_person, always use main amount
        if (in_array($mainPrice->type, ['fixed', 'per_person'])) {
            return $mainPrice->amount;
        }

        // For hourly/daily with specific duration
        if ($duration) {
            $conditionalPrice = $this->conditionalPricings()
                ->where('duration', $duration)
                ->first();
            
            if ($conditionalPrice) {
                return $conditionalPrice->amount;
            }
            
            // Fallback: main amount * duration
            return $mainPrice->amount * $duration;
        }

        // No duration specified, return main amount
        return $mainPrice->amount;
    }

    public function taxes(): BelongsToMany
    {
        return $this->belongsToMany(Tax::class, 'service_taxes')->using(ServiceTax::class);
    }

    public function extrasGroups(): BelongsToMany
    {
        return $this->belongsToMany(ExtrasGroup::class, 'service_extras')->using(ServiceExtras::class)->withPivot('is_required', 'max_selectable');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}