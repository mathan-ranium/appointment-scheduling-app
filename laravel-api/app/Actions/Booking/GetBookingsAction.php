<?php

namespace App\Actions\Booking;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class GetBookingsAction
{
    public function execute(Request $request): JsonResponse
    {
        $userId = Auth::id();
        $search = $request->input('search');
        $perPage = $request->input('perPage', 10);

        $bookings = Booking::with('availability')
            ->whereHas('availability', fn($query) => $query->where('user_id', $userId))
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('title', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage);

        return response()->json($bookings);
    }
}
