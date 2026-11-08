<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $contact = ContactMessage::create($validated);

        $this->notify($contact);

        return back()->with('contact_sent', true);
    }

    /**
     * Email D'Vaughn about the new message via Resend.
     * The key lives in RESEND_KEY (see config/services.php). If it is not
     * configured, the message is still stored in the database and this
     * quietly logs instead of failing the submission.
     */
    private function notify(ContactMessage $contact): void
    {
        $apiKey = config('services.resend.key');

        if (! $apiKey) {
            Log::info('Contact message stored; RESEND_KEY not configured, email not sent.', ['id' => $contact->id]);

            return;
        }

        try {
            $response = Http::withToken($apiKey)
                ->timeout(10)
                ->post('https://api.resend.com/emails', [
                    'from' => 'jewel OS <contact@dvaughnhouse.com>',
                    'to' => ['dvaughnhouse@gmail.com'],
                    'subject' => 'jewel OS contact: '.$contact->name,
                    'text' => "Name: {$contact->name}\nEmail: {$contact->email}\n\n{$contact->message}",
                ]);

            if (! $response->successful()) {
                Log::warning('Resend notify failed for contact message.', ['id' => $contact->id, 'status' => $response->status()]);
            }
        } catch (\Throwable $e) {
            Log::warning('Resend notify threw for contact message.', ['id' => $contact->id, 'error' => $e->getMessage()]);
        }
    }
}
