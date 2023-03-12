<?php

namespace App\Enums;

enum ItemStatus: string
{
    case Pending = 'pending';
    case Completed = 'completed';
}
