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
    <form class="col-3" id="searchTrackCodeForm">
        <input id="search" type="text" class="form-control " placeholder="{{ __('Search') }}"
            aria-label="{{ __('Search') }}" aria-describedby="basic-addon1">
    </form>
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
<script>
    function correctItemPaginationLinks() {
        $('#items_pagination a').on('click', function (e) {
            e.preventDefault();


            // Keyword
            var keyword = $('#search').val();

            // Get params from URL
            let url = new URL(window.location.href);
            let id = url.searchParams.get("courier_id");

            // Get sorting
            if (!url.searchParams.get("sort")) {
                // Adding param to url
                url.searchParams.set('sortItem', 'track_code');
                // Update the URL in the address bar without reloading the page
                history.pushState({}, '', url);
            };

            // Get sorting
            if (!url.searchParams.get("order")) {
                // Adding param to url
                url.searchParams.set('orderItem', 'asc');
                // Update the URL in the address bar without reloading the page
                history.pushState({}, '', url);
            };

            // Get paginationItems
            if (!url.searchParams.get("paginationItems")) {
                // Adding param to url
                url.searchParams.set('paginationItems', 5);
                // Update the URL in the address bar without reloading the page
                history.pushState({}, '', url);
            };

            // Sorting
            let sortField = url.searchParams.get("sortItem");
            let sortOrder = url.searchParams.get("orderItem");
            let paginationItems = url.searchParams.get('paginationItems');
            let page_items = url.searchParams.get('page_items');

            console.log("correcting items links")
            $.ajax({
                url: $(this).attr('href'),
                type: 'GET',
                data: {
                    track_code: keyword ? keyword : undefined,
                    courier_id: id,
                    sortItem: sortField,
                    orderItem: sortOrder,
                    paginationItems: paginationItems,
                },
                success: (response) => {
                    console.dir("#items_pagination a");
                    console.dir(response);


                    let rows = '';
                    $.each(response.data, function (index, item) {
                        rows += '<tr>';
                        rows += '<td>' + item.track_code + '</td>';
                        rows += '<td>' + (item.picked_up ? item.picked_up : "N/A") + '</td>';
                        rows += '<td>' + (item.dropped_off ? item.dropped_off : "N/A") + '</td>';
                        rows += '<td>' + "N/A" + '</td>';
                        rows += '</tr>';
                    });
                    $('#items_tbody').html(rows);
                    $('#items_pagination').html(response.linksHTML);
                    correctItemPaginationLinks()
                }
            });
        });
    }

    $(document).ready(function () {
        $('#couriers_table th').on('click', function () {
            let sortField = $(this).data('sort');
            let sortOrder = $(this).data('order');

            $.ajax({
                url: '{{ route('couriers.sort') }}',
                type: 'GET',
                data: {
                    sort: sortField,
                    order: sortOrder,
                    pagination: {{$pagination}},
                    page: {{$_GET["page"] ?? 1}}
                    },
                success: (response) => {
                    console.dir(response);
                    let rows = '';
                    $.each(response.data, function (index, courier) {
                        rows += '<tr>';
                        rows += '<td>' + courier.name + '</td>';
                        rows += '<td>' + courier.delivered + '</td>';
                        rows += '<td>' + courier.in_progress + '</td>';
                        rows += '<td>' + courier.failed + '</td>';
                        rows += '</tr>';
                    });
                    $('#couriers_tbody').html(rows);

                    // Toggle the sort order for the next click
                    if (sortOrder === 'asc') {
                        $(this).data('order', 'desc');
                        $(this).attr('data-order', 'desc');

                    } else {
                        $(this).data('order', 'asc');
                        $(this).attr('data-order', 'asc');
                    }

                }
            });
        });
    });
    let courier_id;
    $(document).ready(function () {
        $('.C-courier-list-item').on('click', function () {
            coruierId = $(this).data('id');
            $.ajax({
                url: '{{ route('courier.items') }}',
                type: 'GET',
                data: {
                    pagination: {{$pagination}},
                    courier_id: coruierId,
                    page: {{$_GET["page"] ?? 1}}
                    },
                success: (response) => {
                    console.log('.C-courier-list-item');

                    let rows = '';
                    $.each(response.data, function (index, item) {
                        rows += '<tr>';
                        rows += '<td>' + item.track_code + '</td>';
                        rows += '<td>' + (item.picked_up ? item.picked_up : "N/A") + '</td>';
                        rows += '<td>' + (item.dropped_off ? item.dropped_off : "N/A") + '</td>';
                        rows += '<td>' + "N/A" + '</td>';
                        rows += '</tr>';
                    });
                    $('#items_tbody').html(rows);
                    $('#items_pagination').html(response.linksHTML);
                    correctItemPaginationLinks()

                    let url = new URL(window.location.href);

                    // Adding param to url
                    url.searchParams.set('courier_id', coruierId);
                    console.dir(response);
                    console.dir(response.links);

                    // Update the URL in the address bar without reloading the page
                    history.pushState({}, '', url);
                }
            });
        });
    });
    $(document).ready(function () {
        $('#couriers_table th').on('click', function () {
            let sortField = $(this).data('sort');
            let sortOrder = $(this).data('order');

            $.ajax({
                url: '{{ route('couriers.sort') }}',
                type: 'GET',
                data: {
                    sort: sortField,
                    order: sortOrder,
                    pagination: {{$pagination}},
                    page: {{$_GET["page"] ?? 1}}
                    },
                success: (response) => {
                    console.log('#couriers-tbody th');
                    console.dir(response);
                    let rows = '';
                    $.each(response.data, function (index, courier) {
                        rows += '<tr>';
                        rows += '<td>' + courier.name + '</td>';
                        rows += '<td>' + courier.delivered + '</td>';
                        rows += '<td>' + courier.in_progress + '</td>';
                        rows += '<td>' + courier.failed + '</td>';
                        rows += '</tr>';
                    });
                    $('#couriers_tbody').html(rows);

                    // Toggle the sort order for the next click
                    if (sortOrder === 'asc') {
                        $(this).data('order', 'desc');
                        $(this).attr('data-order', 'desc');

                    } else {
                        $(this).data('order', 'asc');
                        $(this).attr('data-order', 'asc');
                    }
                    
                    $('#items_pagination').html(response.linksHTML);
                    console.dir(response.linksHTML);
                    correctItemPaginationLinks()


                }
            });
        });
    });
    $(document).ready(function () {
        $('#search').on('keyup', function (e) {
            // Keyword
            var keyword = $('#search').val();

            // Get params from URL
            let url = new URL(window.location.href);
            let id = url.searchParams.get("courier_id");

            // Get sorting
            if (!url.searchParams.get("sort")) {
                // Adding param to url
                url.searchParams.set('sortItem', 'track_code');
                // Update the URL in the address bar without reloading the page
                history.pushState({}, '', url);
            };

            // Get sorting
            if (!url.searchParams.get("order")) {
                // Adding param to url
                url.searchParams.set('orderItem', 'asc');
                // Update the URL in the address bar without reloading the page
                history.pushState({}, '', url);
            };

            // Get page_items
            if (!url.searchParams.get("page_items")) {
                // Adding param to url
                url.searchParams.set('page_items', 1);
                // Update the URL in the address bar without reloading the page
                history.pushState({}, '', url);
            };

            // Get paginationItems
            if (!url.searchParams.get("paginationItems")) {
                // Adding param to url
                url.searchParams.set('paginationItems', 5);
                // Update the URL in the address bar without reloading the page
                history.pushState({}, '', url);
            };

            // Sorting
            let sortField = url.searchParams.get("sortItem");
            let sortOrder = url.searchParams.get("orderItem");
            let paginationItems = url.searchParams.get('paginationItems');
            let page_items = url.searchParams.get('page_items');

            $.ajax({
                url: '{{ route('courier.items.search') }}',
                type: 'GET',
                data: {
                    track_code: keyword ? keyword : undefined,
                    courier_id: id,
                    sortItem: sortField,
                    orderItem: sortOrder,
                    paginationItems: paginationItems,
                    page_items: page_items,
                },
                success: (response) => {
                    console.log('#search');
                    console.dir(response);
                    console.dir(id);

                    // Fill the table
                    let rows = '';
                    $.each(response.data, function (index, item) {
                        rows += '<tr>';
                        rows += '<td>' + item.track_code + '</td>';
                        rows += '<td>' + (item.picked_up ? item.picked_up : "N/A") + '</td>';
                        rows += '<td>' + (item.dropped_off ? item.dropped_off : "N/A") + '</td>';
                        rows += '<td>' + "N/A" + '</td>';
                        rows += '</tr>';
                    });

                    $('#items_tbody').html(rows);
                    $('#items_pagination').html(response.linksHTML);
                    console.dir(response.linksHTML);
                    correctItemPaginationLinks()
                }
            });
        });
        const form = document.querySelector('form');
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevents the default form submission behavior.
            // Your form submission logic here.
        });
    });

    // Setting sort for items
    $(document).ready(function () {
        $('#items_table th').on('click', function () {
            var keyword = $('#search').val();

            // Get params from URL
            let url = new URL(window.location.href);
            let id = url.searchParams.get("courier_id");

            // Get sorting
            if (!url.searchParams.get("page_items")) {
                // Adding param to url
                url.searchParams.set('page_items', 1);
                // Update the URL in the address bar without reloading the page
            };

            // Get sorting
            if (!url.searchParams.get("paginationItems")) {
            console.log('resetting pagitems')
                // Adding param to url
                url.searchParams.set('paginationItems', 5);
                // Update the URL in the address bar without reloading the page
            };
            history.pushState({}, '', url);

            // Sorting
            let sortField = $(this).data('sort');
            let sortOrder = $(this).data('order');
            let paginationItems = url.searchParams.get('paginationItems');
            let page_items = url.searchParams.get('page_items');

            url.searchParams.set('sortItem', sortField);
            url.searchParams.set('orderItem', sortOrder);
            // Update the URL in the address bar without reloading the page
            history.pushState({}, '', url);

            $.ajax({
                url: '{{ route('courier.items.search') }}',
                type: 'GET',
                data: {
                    track_code: keyword ? keyword : undefined,
                    courier_id: id,
                    sortItem: sortField,
                    orderItem: sortOrder,
                    paginationItems: paginationItems,
                    page_items: page_items,
                },
                success: (response) => {
                    console.log('#items_table th');
                    console.dir(response);

                    let rows = '';
                    $.each(response.data, function (index, item) {
                        rows += '<tr>';
                        rows += '<td>' + item.track_code + '</td>';
                        rows += '<td>' + (item.picked_up ? item.picked_up : "N/A") + '</td>';
                        rows += '<td>' + (item.dropped_off ? item.dropped_off : "N/A") + '</td>';
                        rows += '<td>' + "N/A" + '</td>';
                        rows += '</tr>';
                    });
                    $('#items_tbody').html(rows);
                    $('#items_pagination').html(response.linksHTML);
                    correctItemPaginationLinks()

                    // Toggle the sort order for the next click
                    if (sortOrder === 'asc') {
                        $(this).data('order', 'desc');
                        $(this).attr('data-order', 'desc');

                    } else {
                        $(this).data('order', 'asc');
                        $(this).attr('data-order', 'asc');
                    }


                }
            });
        });
    });

</script>
<div class="d-flex gap-4">
    <div class="card bg-lightp-0 p-0 mt-3 d-flex col">
        <div class="card-body p-0 col">
            <table class="table C-table-list col m-0" id="couriers_table">
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
                <tbody id="couriers_tbody">
                    @foreach ($couriers as $courier)
                        <tr class="item C-list-item C-courier-list-item" data-id="{{$courier->id}}">
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
            <div class="d-flex flex-row-reverse p-2" aria-label="{{ __('Page navigation example') }}" id="pagination">
                {{$couriers->appends(compact("couriers", 'sortField', 'sortOrder', 'pagination'))->links()}}
            </div>
        </div>
    </div>

    <div class="card bg-lightp-0 p-0 mt-3 d-flex col">
        <div class="card-body p-0 col">
            <table class="table C-table-list col C-courier-items-list m-0" id="items_table">
                <thead>
                    <tr class="C-list-item">
                        <th class="custom d-none">
                            <input type="checkbox" id="checkall" onclick="setAllCheckboxes(this);">
                        </th>
                        <th class="C-table-sort" data-sort="track_code" data-order="asc">
                            {{ __('Track Code') }}
                        </th>
                        <th class="C-table-sort" data-sort="picked_up" data-order="asc">
                            {{ __('Picked Up') }}
                        </th>
                        <th class="C-table-sort" data-sort="dropped_off" data-order="asc">
                            {{ __('Dropped Off') }}
                        </th>
                        <th class="C-table-sort" data-sort="time_difference" data-order="asc">
                            {{ __('Time Difference') }}
                        </th>
                    </tr>
                </thead>
                <tbody id="items_tbody"></tbody>
            </table>
            <div class="d-flex flex-row-reverse p-2" aria-label="{{ __('Page navigation example') }}"
                id="items_pagination"></div>
        </div>
    </div>

</div>

<div class="d-flex justify-content-between mt-3">
    <div>
        {{ __('Show') }}
        <div class="btn-group dropup">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
</div>


@endsection