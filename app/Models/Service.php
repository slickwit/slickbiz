<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
// use Illuminate\Database\Eloquent\Relations\HasManyThrough;


class Service extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'max_capacity',
        'features',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
        'max_capacity' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Service $service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->name);
            }
        });
    }

    /**
     * Get the prices for the service.
     */
    public function prices(): HasMany
    {
        return $this->hasMany(Price::class);
    }

    /**
     * Get the active prices for the service.
     */
    public function activePrices(): HasMany
    {
        return $this->prices()->where('is_active', true);
    }

    /**
     * Get the taxes for the service.
     */
    public function taxes(): BelongsToMany
    {
        return $this->belongsToMany(Tax::class, 'service_tax');
    }

    /**
     * Get the active taxes for the service.
     */
    public function activeTaxes(): BelongsToMany
    {
        return $this->taxes()->where('is_active', true);
    }

    /**
     * Get the extras groups available for this service.
     */
    public function extrasGroups(): BelongsToMany
    {
        return $this->belongsToMany(ExtrasGroup::class, 'service_extras');
    }

    /**
     * Get the active extras groups for this service.
     */
    public function activeExtrasGroups(): BelongsToMany
    {
        return $this->extrasGroups()->where('is_active', true);
    }

    /**
     * Get all extras items available for this service.
     */
    public function availableExtrasItems()
    {
        return ExtrasItem::whereHas('group.services', function ($query) {
            $query->where('services.id', $this->id);
        })->where('is_active', true);
    }

    /**
     * Get the reservations for the service.
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Get upcoming reservations for the service.
     */
    public function upcomingReservations(): HasMany
    {
        return $this->reservations()
            ->where('start_datetime', '>', now())
            ->whereIn('status', ['confirmed', 'pending']);
    }

    /**
     * Get completed reservations for the service.
     */
    public function completedReservations(): HasMany
    {
        return $this->reservations()
            ->where('status', 'completed');
    }

    /**
     * Scope a query to only include active services.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include services of a specific type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope a query to search services by name or description.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    /**
     * Get the default price for the service.
     */
    public function getDefaultPriceAttribute()
    {
        return $this->prices()->where('is_active', true)->first();
    }

    /**
     * Check if the service has available slots for a given datetime.
     */
    public function isAvailableAt($startDateTime, $endDateTime, $units = 1)
    {
        // This is a placeholder - you'll implement actual availability logic later
        // For now, we'll assume it's always available
        return true;
        
        // Future implementation might look like:
        // $conflictingReservations = $this->reservations()
        //     ->where(function ($query) use ($startDateTime, $endDateTime) {
        //         $query->whereBetween('start_datetime', [$startDateTime, $endDateTime])
        //               ->orWhereBetween('end_datetime', [$startDateTime, $endDateTime])
        //               ->orWhere(function ($q) use ($startDateTime, $endDateTime) {
        //                   $q->where('start_datetime', '<', $startDateTime)
        //                     ->where('end_datetime', '>', $endDateTime);
        //               });
        //     })
        //     ->whereIn('status', ['confirmed', 'checked_in'])
        //     ->count();
        //
        // return $conflictingReservations < $this->max_capacity;
    }

    /**
     * Get the service types available in the system.
     */
    public static function getTypes(): array
    {
        return [
            'studio' => 'Studio',
            'room' => 'Room',
            'equipment' => 'Equipment',
            'appointment' => 'Appointment',
            'table' => 'Table',
            'venue' => 'Venue',
            'other' => 'Other',
        ];
    }
}
