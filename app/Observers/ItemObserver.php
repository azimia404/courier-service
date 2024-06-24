<?php

namespace App\Observers;

use App\Models\Item;
use App\Models\Courier;

class ItemObserver
{
    /**
     * Handle the Item "created" event.
     *
     * @param  \App\Models\Item  $item
     * @return void
     */
    public function created(Item $item)
    {
        //
        $courier = Courier::find($item->courier_id);
        $courier->update([$item->status => $courier->value($item->status) + 1]);
        $courier->save();
        dump("WORKS");
    }

    /**
     * Handle the Item "updated" event.
     *
     * @param  \App\Models\Item  $item
     * @return void
     */
    public function updated(Item $item)
    {
        //
        $courier = Courier::find($item->courier_id);
        $courier->update([$item->status => $courier->value($item->status) + 1]);
        $courier->save();
        dump("U{DATES");
    }

    /**
     * Handle the Item "deleted" event.
     *
     * @param  \App\Models\Item  $item
     * @return void
     */
    public function deleted(Item $item)
    {
        //
    }

    /**
     * Handle the Item "restored" event.
     *
     * @param  \App\Models\Item  $item
     * @return void
     */
    public function restored(Item $item)
    {
        //
    }

    /**
     * Handle the Item "force deleted" event.
     *
     * @param  \App\Models\Item  $item
     * @return void
     */
    public function forceDeleted(Item $item)
    {
        //
    }
}
