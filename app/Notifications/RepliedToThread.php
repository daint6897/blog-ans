<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class RepliedToThread extends Notification
{
    use Queueable;


    public $thread,$contentCmt;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($thread,$contentCmt)
    {
        $this->thread=$thread;
        $this->contentCmt=$contentCmt;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database','broadcast'];
    }



    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return[
            'thread'=>$this->thread,
            'user'=>auth()->user()
        ];
    }


    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'thread'=>$this->thread,
            'contentCmt'=>$this->contentCmt,
            'user'=>auth()->user()
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
