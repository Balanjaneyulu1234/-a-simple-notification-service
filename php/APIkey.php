use GuzzleHttp\Client;

class ExternalEmailChannel
{
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://your-email-service.com',
            'headers' => [
                'Authorization' => 'Bearer ' . env('EMAIL_API_KEY'),
                'Accept' => 'application/json',
            ],
        ]);
    }

    private function sendEmail($emailData)
    {
        return $this->client->post('/api/send', [
            'json' => $emailData,
        ]);
    }
}
