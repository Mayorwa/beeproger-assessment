<?php

namespace App\Http\Controllers;

use App\Enums\ItemStatus;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ItemController extends Controller
{
    //
    public function getAllItems(Request $request): JsonResponse
    {
        $items = Item::get();
        return $this->okResponse('Items Retrieved Successfully.', ItemResource::collection($items));
    }
    public function getOneItem(Request $request): JsonResponse
    {
        $item = Item::where('id', $request->item_id)->first();

        if (!$item) {
            throw new HttpException(404, "Specified item not found.");
        }

        return $this->okResponse('Item Retrieved Successfully.', new ItemResource($item));
    }
    public function createAnItem(Request $request): JsonResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'min:4', 'max:40'],
            'description' => ['required', 'string'],
            'image' => ['string'],
        ]);

        $body = ['title', 'description'];

        if ($request->image){
            $body[] = 'image';
        }


        $itemId = Item::create($request->only($body))->id;

        $item = Item::where('id', $itemId)->first();

        return $this->createdResponse('Item Created Successfully.', new ItemResource($item));
    }
    public function updateAnItem(Request $request): JsonResponse
    {
        $request->validate([
            'title' => ['string'],
            'description' => ['string'],
            'image' => ['string'],
        ]);

        $item = Item::where('id', $request->item_id);

        if (!$item->first()) {
            throw new HttpException(404, "Specified item not found.");
        }

        $body = ['title', 'description'];

        if ($request->image){
            $body[] = 'image';
        }

        $item->update($request->only($body));

        $item = Item::where('id', $request->item_id)->first();

        return $this->okResponse('Item Updated Successfully.', new ItemResource($item));
    }
    public function markItemAsComplete(Request $request): JsonResponse
    {
        $request->validate([
            'item_id' => ['required']
        ]);

        $item = Item::where('id', $request->item_id);
        if (!$item->first()) {
            throw new HttpException(404, "Specified item not found.");
        }

        $item->update(["status" => "completed"]);

        $item = Item::where('id', $request->item_id)->first();
        return $this->okResponse('Item Completed Successfully.', new ItemResource($item));
    }

    public function deleteAnItem(Request $request): JsonResponse {
        $item = Item::where('id', $request->item_id);

        if (!$item->first()) {
            throw new HttpException(404, "Specified item not found.");
        }

        $item->delete();

        return $this->okResponse('Item Deleted Successfully.', []);
    }
}
