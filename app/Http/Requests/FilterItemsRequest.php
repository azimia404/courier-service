<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterItemsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "courierId"=> "integer",
            "courier_id"=> "integer",
            "sortItem"=> "string",
            "orderItem"=> "string",
            "track_code"=> "",
            "page_items"=> "int",
            "paginationItems"=> "int",
            "picked_up"=> "",
            "dropped_off"=> "",
        ];
    }
}
