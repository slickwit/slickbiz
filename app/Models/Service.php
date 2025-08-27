<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends BaseModel
{
    use SoftDeletes;

    public function extrasGroups(): BelongsToMany
    {
        return $this->belongsToMany(ExtrasGroup::class, 'service_extras');
    }

    public function availableExtrasItems()
    {
        return ExtrasItem::whereHas('group.services', function ($query) {
            $query->where('services.id', $this->id);
        })->where('is_active', true);
    }
}
