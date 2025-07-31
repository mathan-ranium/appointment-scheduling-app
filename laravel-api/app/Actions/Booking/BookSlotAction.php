<?php

namespace App\Actions\Booking;

use Carbon\Carbon;
use App\Models\Booking;
use App\Models\Availability;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\BookSlotRequest;
use Illuminate\Http\JsonResponse;
use App\Mail\BookingConfirmationMail;

class BookSlotAction
{
    /**
     * Handles booking and sends confirmation emails.
     *
     * @param BookSlotRequest $request
     * @return JsonResponse
     */
    public function execute(BookSlotRequest $request): JsonResponse
    {
        $date = $request->date;

        if (!$date) {
            return response()->json(['error' => trans('common.date_required')], 400);
        }

        $dayName = Carbon::parse($date)->format('l');

        $availability = Availability::where('user_id', Auth::id())
            ->where('day', $dayName)
            ->first();

        if (!$availability) {
            return response()->json(['error' => trans('common.availablity_not_found')], 404);
        }

        $formattedTime = date('H:i:s', strtotime($request->time));

        $alreadyBooked = Booking::where('availability_id', $availability->id)
            ->where('booked_time', $formattedTime)
            ->where('date', $request->date)
            ->exists();

        if ($alreadyBooked) {
            return response()->json(['message' => trans('common.already_booked')], 409);
        }

        $booking = Booking::create([
            'availability_id' => $availability->id,
            'title' => $request->title,
            'name' => $request->name,
            'email' => $request->email,
            'date' => $request->date,
            'booked_time' => $request->time,
        ]);

    
        $formattedTime = Carbon::createFromFormat('H:i', $booking->booked_time)->format('g:i A');

        // Prepare data for mail
        $mailData = [
            'name' => $request->name,
            'title' => $booking->title,
            'booked_time' => $formattedTime,
            'date' => $booking->date,
            'host_name' => Auth::user()->name,
        ];

        // Send confirmation mail to guest
        Mail::to($booking->email)->send(new BookingConfirmationMail($mailData, 'guest'));

        // Send confirmation mail to host
        Mail::to(Auth::user()->email)->send(new BookingConfirmationMail($mailData, 'host'));

        return response()->json([
            'message' => 'Booking confirmed!',
            'booking' => $booking,
        ], 201);
    }
}
