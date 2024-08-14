use Illuminate\Contracts\Queue\ShouldQueue;

class YourNotification extends Notification implements ShouldQueue
{
    public function via($notifiable)
    {
        return [ExternalEmailChannel::class];
    }

    public function toExternalEmail($notifiable)
    {
        // Return the email data for the external channel
    }
}
