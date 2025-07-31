<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class BookingConfirmationMail
 * 
 * Sends booking confirmation email with booking data and type.
 */
class BookingConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Booking data to be sent to the email view.
     */
    public array $data;

    /**
     * Type of booking (optional).
     */
    public string|null $type;

    /**
     * Create a new message instance.
     *
     * @param array $data - Booking data
     * @param string|null $type - Type of the booking
     */
    public function __construct(array $data, string $type = null)
    {
        $this->data = $data;
        $this->type = $type;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): self
    {
        return $this->subject('Booking Confirmation')
                    ->view('emails.booking-confirmation')
                    ->with([
                        'data' => $this->data,
                        'type' => $this->type,
                    ]);
    }
}
