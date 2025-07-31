<?php

namespace App\Actions\Booking;

use Carbon\Carbon;
use App\Models\Booking;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class GetSlotsAction
{
    public function execute(Request $request): JsonResponse
    {
        $date = $request->query('date');

        if (!$date) {
            return response()->json(['error' => trans('common.date_required')], 400);
        }

        $dayName = Carbon::parse($date)->format('l');

        $availability = Availability::where('user_id', Auth::id())
            ->where('day', $dayName)
            ->first();

        if (!$availability) {
            return response()->json(['error' => trans('common.no_availability')], 404);
        }

        $start = Carbon::createFromFormat('H:i:s', $availability->start_time);
        $end = Carbon::createFromFormat('H:i:s', $availability->end_time);

        $slots = [];

        while ($start < $end) {
            $slots[] = [
                'time' => $start->format('H:i'),
                'isBooked' => false
            ];
            $start->addMinutes(30);
        }

        $bookedTimes = Booking::where('availability_id', $availability->id)
            ->where('date', $date)
            ->pluck('booked_time')
            ->map(fn($time) => Carbon::createFromFormat('H:i:s', $time)->format('H:i'))
            ->toArray();

        foreach ($slots as &$slot) {
            if (in_array($slot['time'], $bookedTimes)) {
                $slot['isBooked'] = true;
            }
        }

        return response()->json($slots);
    }
}
