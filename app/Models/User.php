<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'company_id',
        'first_name',
        'middle_name',
        'last_name',
        'username',
        'email',
        'password',
        'phone',
        'country',
        'state',
        'city',
        'address',
        'zip',
        'joined_date',
        'date_of_birth',
        'status',
    ];

    protected $appends = [
        'full_name',
        'name'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getFullNameAttribute()
    {
        $full_name = $this->first_name ? $this->first_name . " " : "";
        if($this->middle_name) {
            $full_name .= $this->middle_name . " ";
        }
        $full_name .= $this->last_name ? $this->last_name : "";
        return $full_name;
    }

    public function getNameAttribute()
    {
        $name = $this->first_name ? $this->first_name . " " : "";
        $name .= $this->last_name ? $this->last_name : "";
        return $name;
    }
}
