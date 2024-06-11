<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterCouriersRequest extends FormRequest
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
            "name"=> "string",
            "delivered"=> "integer",
            "in_progress"=> "integer",
            "failed"=> "integer",
        ];
    }
}
