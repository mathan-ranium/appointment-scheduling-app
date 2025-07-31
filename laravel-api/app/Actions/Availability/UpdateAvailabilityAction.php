<?php

namespace App\Actions\Availability;

use App\Models\Availability;
use App\Http\Requests\AvailabilityRequest;

class UpdateAvailabilityAction
{
    /**
     * Handle the update of an availability model.
     *
     * @param AvailabilityRequest $request
     * @param Availability $availability
     * @return Availability
     */
    public function handle(AvailabilityRequest $request, Availability $availability): Availability
    {
        // Find the availability that belongs to the authenticated user
        $availability = Availability::where('user_id', $request->user()->id)
                                    ->findOrFail($availability->id);

        // Update with validated data
        $availability->update($request->validated());

        return $availability;
    }
}
