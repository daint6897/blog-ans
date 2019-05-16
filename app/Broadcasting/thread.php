<?php

namespace App\Broadcasting;

use App\User;
use App\Comment;

class thread
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\User  $user
     * @return array|bool
     */
    public function join(User $user,Comment $cmt
    {
        $userIds = [$cmt->user_id, $cmt->commentable_id];
        if (in_array($user->id, $userIds)) {
             return true;
        }
        return false;
    }
}
