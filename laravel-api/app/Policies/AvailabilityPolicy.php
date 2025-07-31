<?php

namespace App\Policies;

use App\Models\Availability;
use App\Models\User;

class AvailabilityPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Availability $availability)
    {
        return $user->id === $availability->user_id;
    }
}
