<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterItemsRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Models\Courier;
use \Illuminate\Pagination\Paginator;


class CourierController extends Controller
{
    
    public function index(Request $request){
        // Get the sort option from the request, default to sorting by 'id'
        $sortField = $request->input('sort', 'id');
        $sortOrder = $request->input('order', 'asc'); // 'asc' or 'desc'
        $pagination = $request->input('pagination', 50);
        $courierId = $request->input('courierId', null);
        $currentPage = $request->input('page', 1);; // You can set this to any page you want to paginate to

        // Make sure that you call the static method currentPageResolver()
        // before querying users
        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        // Fetch and sort the couriers
        $couriers = Courier::orderBy($sortField, $sortOrder)->paginate($pagination);
        return view("main", compact("couriers", 'sortField', 'sortOrder', 'pagination', 'courierId'));
    }
    public function sort(Request $request)
    {
        $sortField = $request->input('sort', 'id');
        $sortOrder = $request->input('order', 'asc');
        $pagination = $request->input('pagination', 50);

        $currentPage = $request->input('page');; // You can set this to any page you want to paginate to

        // Make sure that you call the static method currentPageResolver()
        // before querying users
        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });
        
        $couriers = Courier::orderBy($sortField, $sortOrder)->paginate($pagination);
        return response()->json($couriers);
    }
    public function items(Request $request)
    {
        // Get the sort option from the request, default to sorting by 'id'
        $sortField = $request->input('sort', 'id');
        $sortOrder = $request->input('order', 'asc'); // 'asc' or 'desc'
        $pagination = $request->input('pagination', 50);
        $courierId = $request->input('courierId', null);
        $currentPage = $request->input('page', 1);; // You can set this to any page you want to paginate to

        // Make sure that you call the static method currentPageResolver()
        // before querying users
        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        // Fetch and sort the couriers
        $info = Item::where('courier_id','=', $courierId)->paginate($pagination);
        $request->fullUrlWithQuery(['courierId' => $courierId]);
        return response()->json($info);
    }
    public function search(FilterItemsRequest $request)
    {
        $data = $request->validated();

        $query = Item::query();

        // Form request
        if(isset($data['track_code'])){
            $query->where('track_code','like','%'.$data['track_code'].'%');
        }

        if(isset($data['picked_up'])){}

        if(isset($data['dropped_off'])){}

        $query->where('courier_id','=',$data['courier_id']);

        $items = $query->get();

        // Fetch and sort the couriers
        return response()->json($items);
    }
}
