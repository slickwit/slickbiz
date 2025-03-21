<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Company extends Model
{
    use Notifiable, HasFactory, HasUlids;

    protected $fillable = [
        'name',
        'slogan',
        'email',
        'description',
        'website',
        'phone',
        'country',
        'state',
        'city',
        'address',
        'zip',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
