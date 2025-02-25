<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterItemsRequest;
use App\Http\Requests\FilterCouriersRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Models\Courier;
use \Illuminate\Pagination\Paginator;
use \Illuminate\Support\Facades\Log;


class CourierController extends Controller
{

    public function index(Request $request)
    {
        // Get the sort option from the request, default to sorting by 'id'
        $sortField = $request->input('sort', 'id');
        $sortOrder = $request->input('order', 'asc'); // 'asc' or 'desc'
        $pagination = $request->input('pagination', 5);
        $courier_id = $request->input('courier_id', '');
        $currentPage = $request->input('page', 1);
        ; // You can set this to any page you want to paginate to

        // Make sure that you call the static method currentPageResolver()
        // before querying users
        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        // Fetch and sort the couriers
        $couriers = Courier::orderBy($sortField, $sortOrder)->paginate($pagination);
        return view("main", compact("couriers", 'sortField', 'sortOrder', 'pagination', 'courier_id'));
    }
    public function sort(FilterCouriersRequest $request)
    {
        $data = $request->validated();

        $query = Courier::query();

        if (isset($data['nameCourier'])) {
            $query->where('name', 'like', '%'.$data['nameCourier'].'%');
        }
        // Sorting
        if (isset($data['sort']) && isset($data['order'])) {
            $query->orderBy($data['sort'], $data['order']);
        }
        // Pagination
        $pagination = $data['pagination'] ?? 5;

        // Sorting
        if (isset($data['page'])) {
            $page = $data['page'];
            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });
        }

        $items = $query->paginate($pagination, ['*'], 'page');
        $linksHTML = ["linksHTML" => $items->links()->render()];
        $data = (object) array_merge((array) $items->toArray(), (array) $linksHTML);
        // Fetch and sort the couriers
        return response()->json($data);
    }
    public function items(Request $request)
    {
        // Get the sort option from the request, default to sorting by 'id'
        $sortField = $request->input('sort', 'id');
        $sortOrder = $request->input('order', 'asc'); // 'asc' or 'desc'
        $pagination = $request->input('pagination', 5);
        $courier_id = $request->input('courier_id', '');
        $page_items = $request->input('page_items', 1);
        ; // You can set this to any page you want to paginate to

        // Make sure that you call the static method currentPageResolver()
        // before querying users
        Paginator::currentPageResolver(function () use ($page_items) {
            return $page_items;
        });

        // Fetch and sort the couriers
        $info = Item::where('courier_id', '=', $courier_id)->paginate($pagination, ['*'], 'page_items');
        $linksHTML = ["linksHTML" => $info->appends(compact("courier_id", 'sortField', 'sortOrder', 'pagination', 'page_items'))->links()->render()];
        $data = (object) array_merge((array) $info->toArray(), (array) $linksHTML);

        return response()->json($data);
    }
    public function search(FilterItemsRequest $request)
    {
        $data = $request->validated();

        $query = Item::query();

        // Form request
        if (isset($data['track_code']) && !empty($data['track_code'])) {
            $query->where('track_code', 'like',  '%'.$data['track_code'].'%');
        }

        if (isset($data['picked_up'])) {
        }

        if (isset($data['dropped_off'])) {
        }

        if (isset($data['courier_id'])) {
            $query->where('courier_id', '=', $data['courier_id']);
        }
        // Sorting
        if (isset($data['orderItem']) && isset($data['sortItem'])) {
            $query->orderBy($data['sortItem'], $data['orderItem']);
        }
        // Pagination
        $pagination = $data['paginationItems'] ?? 5;

        // Sorting
        if (isset($data['page_items'])) {
            $page_items = $data['page_items'];
            Paginator::currentPageResolver(function () use ($page_items) {
                return $page_items;
            });
        }

        $items = $query->paginate($pagination, ['*'], 'page_items');
        $linksHTML = ["linksHTML" => $items->links()->render()];
        $data = (object) array_merge((array) $items->toArray(), (array) $linksHTML);
        // Fetch and sort the couriers
        return response()->json($data);
    }
    
}
