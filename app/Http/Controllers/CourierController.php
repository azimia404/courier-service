<?php

namespace App\Http\Controllers;

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

        $currentPage = $request->input('page', 1);; // You can set this to any page you want to paginate to

        // Make sure that you call the static method currentPageResolver()
        // before querying users
        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        // Fetch and sort the couriers
        $couriers = Courier::orderBy($sortField, $sortOrder)->paginate($pagination);
        return view("main", compact("couriers", 'sortField', 'sortOrder', 'pagination'));
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
}
