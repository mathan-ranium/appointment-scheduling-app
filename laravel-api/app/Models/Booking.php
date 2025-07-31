<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'availability_id',
        'name',
        'email',
        'date',
        'booked_time',
    ];

    /**
     * Get the availability slot associated with the booking.
     *
     * @return BelongsTo
     */
    public function availability(): BelongsTo
    {
        return $this->belongsTo(Availability::class);
    }
}
