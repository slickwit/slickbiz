<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExtrasGroup extends BaseModel
{
    use SoftDeletes;
    
    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
        'sort_order',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(ExtrasItem::class);
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_extras');
    }

    public function activeItems(): HasMany
    {
        return $this->items()->where('is_active', true);
    }
}
