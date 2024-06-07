@extends('layouts.template')
@section('content')
                    <nav class="p-0" aria-label="{{ __('breadcrumb') }}">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">{{ __('Home') }}</a></li>
                            <li class="breadcrumb-item"><a href="#">{{ __('Library') }}</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Data') }}</li>
                        </ol>
                    </nav>
                    <div class=" row justify-space-between p-0 mt-3">
                        <div class="col p-0">
                            <button type="button" class="btn btn-success">{{ __('Success') }}</button>
                            <button type="button" class="btn btn-primary">{{ __('Activity') }}</button>
                            <button type="button" class="btn btn-secondary">{{ __('Import') }}</button>
                            <button type="button" class="btn btn-primary">{{ __('Send SMS') }}</button>
                        </div>
                        <div class="col-3"><input type="text" class="form-control " placeholder="{{ __('Search') }}"
                                aria-label="{{ __('Search') }}" aria-describedby="basic-addon1"></div>
                    </div>
                    <!-- <div class="p-0 d-flex">
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ __('Track Code') }}
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="{{ __('Search') }}" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">{{ __('Action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Another action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ __('Picked UP') }}
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="{{ __('Search') }}" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">{{ __('Action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Another action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ __('Dropped Off') }}
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="{{ __('Search') }}" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">{{ __('Action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Another action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ __('Time Difference') }}
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="{{ __('Search') }}" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">{{ __('Action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Another action') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                    <li><button class="dropdown-item" type="button">{{ __('Something else here') }}</button></li>
                                </ul>
                            </div>
                        </div>
                    </div> -->
                    <div class="card bg-lightp-0 p-0 mt-3">
                        <div class="card-body p-0">
                            <table class="table C-table-list">
                                <thead>
                                    <tr class="C-list-item">
                                        <th class="custom d-none">
                                            <input type="checkbox" id="checkall" onclick="setAllCheckboxes(this);">
                                        </th>
                                        <th class="C-table-sort" data-sort="name" data-order="asc">{{ __('Account') }}
                                        </th>
                                        <th class="C-table-sort" data-sort="delivered" data-order="asc">
                                            {{ __('Delivered') }}
                                        </th>
                                        <th class="C-table-sort" data-sort="in_progress" data-order="asc">
                                            {{ __('In progress') }}
                                        </th>
                                        <th class="C-table-sort" data-sort="failed" data-order="asc">{{ __('Failed') }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>


                                    @foreach ($couriers as $courier)
                                        <tr class="item C-list-item">
                                            <td>
                                                {{$courier->name}}
                                            </td>
                                            <td>
                                                {{$courier->delivered}}
                                            </td>
                                            <td>
                                                {{$courier->in_progress}}
                                            </td>
                                            <td>
                                                {{$courier->failed}}
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <div>
                            {{ __('Show') }}
                            <div class="btn-group dropup">
                                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    {{$pagination}}
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 1]) }}">1</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 2]) }}">2</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 5]) }}">5</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 10]) }}">10</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 25]) }}">25</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 50]) }}">50</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 100]) }}">100</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 150]) }}">150</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 200]) }}">200</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 250]) }}">250</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <nav aria-label="{{ __('Page navigation example') }}" id="pagination">
                            {{$couriers->appends(compact("couriers", 'sortField', 'sortOrder', 'pagination'))->links()}}
                        </nav>
                    </div>
@endsection