<?php

namespace App\Http\Controllers\Api;

use App\Models\Availability;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\AvailabilityRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Actions\Availability\UpdateAvailabilityAction;

class AvailabilityController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a list of the authenticated user's availability slots.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $availabilities = Availability::where('user_id', Auth::id())->get();

        return response()->json($availabilities);
    }

    /**
     * Update the specified availability for the authenticated user.
     *
     * @param AvailabilityRequest $request
     * @param Availability $availability
     * @param UpdateAvailability $action
     * @return JsonResponse
     */
    public function update(
        AvailabilityRequest $request,
        Availability $availability,
        UpdateAvailabilityAction $action
    ): JsonResponse {
        $this->authorize('update', $availability);

        $updatedAvailability = $action->handle($request, $availability);

        return response()->json([
            'message' => 'Availability updated',
            'data' => $updatedAvailability
        ]);
    }
}
