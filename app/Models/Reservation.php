<?php

namespace App\Models;

class Reservation extends BaseModel
{
    protected $guarded = [];

    protected $casts = [
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
    ];
}
