<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\bookSlotrequest;
use App\Actions\Booking\GetSlotsAction;
use App\Actions\Booking\BookSlotAction;
use App\Actions\Booking\GetBookingsAction;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return (new GetBookingsAction)->execute($request);
    }

    public function bookSlot(bookSlotrequest $request): JsonResponse
    {
        return (new BookSlotAction)->execute($request);
    }

    public function getSlots(Request $request): JsonResponse
    {
        return (new GetSlotsAction)->execute($request);
    }
}
