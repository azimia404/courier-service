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
    function putCourierItemListener() {
        $('.C-courier-list-item').on('click', function () {
            let courierId = $(this).data('id');
            let data = checkURLData({ courierId: courierId });

            $.ajax({
                url: '{{ route('courier.items') }}',
                type: 'GET',
                data: {
                    track_code: data.trackCodeItem,
                    courier_id: data.courierId,
                    sortItem: data.sortItems,
                    orderItem: data.orderItems,
                    paginationItems: data.paginationItems,
                    pagination: data.paginationItems,
                    courier_id: data.courierId,
                },
                success: (response) => {
                    console.log('.C-courier-list-item');
                    deployItemsList(response);

                }
            });
        });
    }

    function correctItemPaginationLinks() {
        $('#items_pagination a').on('click', function (e) {
            console.log('Correcting item pagination links');
            e.preventDefault();

            let data = checkURLData();

            let url = (new URL(window.location.href)) + "&page_items=" + $(this).attr("href").split("page_items=")[1];
            $.ajax({
                url: $(this).attr("href"),
                type: 'GET',
                data: {
                    track_code: data.trackCodeItem,
                    courier_id: data.courierId,
                    sortItem: data.sortItems,
                    orderItem: data.orderItems,
                    paginationItems: data.paginationItems,
                },
                success: (response) => {
                    console.dir(response);
                    deployItemsList(response);
                    correctItemPaginationLinks();
                }
            });
        });
    }
    function correctCourierPaginationLinks() {
        $('#pagination a').on('click', function (e) {
            console.log('Correcting courier links');
            e.preventDefault();

            
            checkURLData();
            let url = window.location.search + "&page=" + $(this).attr("href").split("page=")[1];
            console.log(url);
            
            fetch(`{{ route('couriers.sort') }}${url}`, {
                type: 'Get',
            }).then((response) => response.json())
                .then((response) => deployCouriersList(response));
        });
    }
    function deployCouriersList(response) {
        let rows = '';
        $.each(response.data, function (index, courier) {
            rows += `<tr class="C-courier-list-item" data-id="${courier.id}">`;
            rows += '<td>' + courier.name + '</td>';
            rows += '<td>' + courier.delivered + '</td>';
            rows += '<td>' + courier.in_progress + '</td>';
            rows += '<td>' + courier.failed + '</td>';
            rows += '</tr>';
        });
        $('#couriers_tbody').html(rows);
        console.dir(response);
        $('#pagination').html(response.linksHTML);
        correctCourierPaginationLinks();
        putCourierItemListener();
    }
    function deployItemsList(response) {
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
        correctItemPaginationLinks();
    }

    function correctItemShow() {
        $('#links_items a').on('click', function (e) {
            e.preventDefault();
            let paginationItems = $(this).data('value');

            let data = checkURLData({ paginationItems: paginationItems });


            $.ajax({
                url: '{{ route('courier.items.search') }}',
                type: 'GET',
                data: {
                    track_code: data.trackCodeItem,
                    courier_id: data.courierId,
                    sortItem: data.sortItems,
                    orderItem: data.orderItems,
                    paginationItems: data.paginationItems,
                    page_items: data.pageItems,
                },
                success: (response) => {
                    console.log('#links_items a');
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
                    $('#links_items_show').html(data.paginationItems);
                    // correctItemShow();
                    correctItemPaginationLinks();
                }
            });
        });
    }
    function checkURLData(data = {
        sortCouriers: null,
        orderCouriers: null,
        pageCouriers: null,
        paginationCouriers: null,

        sortItems: null,
        orderItems: null,
        pageItems: null,
        paginationItems: null,

        courierId: null
    }) {
        const newData = Object.assign({}, data);

        let url = new URL(window.location.href);

        if (!(data !== null && typeof data === 'object')) {
            console.error("NOT OBJECT IS GIVEN IN CHECKURLDATA");
            return;
        }

        if (data.sortCouriers == null && !(newData.sortCouriers = url.searchParams.get("sort"))) {
            newData.sortCouriers = "name";
        };
        url.searchParams.set('sort', newData.sortCouriers || 'name');

        // Get order
        if (data.orderCouriers == null && !(newData.orderCouriers = url.searchParams.get("order"))) {
            newData.orderCouriers = "asc";
        };
        url.searchParams.set('order', newData.orderCouriers || 'asc');

        // Get page_items
        if (data.pageCouriers == null && !(newData.pageCouriers = url.searchParams.get("page"))) {
            newData.pageCouriers = 1;
        };
        url.searchParams.set('page', newData.pageCouriers || 1);

        // Get paginationItems
        if (data.paginationCouriers == null && !(newData.paginationCouriers = url.searchParams.get("pagination"))) {
            newData.paginationCouriers = 5;
        };
        url.searchParams.set('pagination', newData.paginationCouriers || 5);

        // Courier ID
        if (data.courierId == null && !(newData.courierId = url.searchParams.get("courierId"))) {
            newData.courierId = 0;
        };
        url.searchParams.set('courierId', newData.courierId || 5);


        // Items data
        // Get sorting
        if (data.sortItems == null && !(newData.sortItems = url.searchParams.get("sortItems"))) {
            newData.sortItems = "track_code";
        };
        url.searchParams.set('sortItems', newData.sortItems || 'track_code');

        // Get order
        if (data.orderItems == null && !(newData.orderItems = url.searchParams.get("orderItems"))) {
            newData.orderItems = "asc";
        };
        url.searchParams.set('orderItems', newData.orderItems || 'asc');

        // Get page_items
        if (data.pageItems == null && !(newData.pageItems = url.searchParams.get("page_items"))) {
            newData.pageItems = 1;
        };
        url.searchParams.set('page_items', newData.pageItems || 1);

        // Get paginationItems
        if (data.paginationItems == null && !(newData.paginationItems = url.searchParams.get("paginationItems"))) {
            newData.paginationItems = 5;
        };
        url.searchParams.set('paginationItems', newData.paginationItems || 5);

        // Get Item track code keyword
        if (data.trackCodeItem == null && !(newData.trackCodeItem = url.searchParams.get("trackCodeItem"))) {
            newData.trackCodeItem = "";
        };
        url.searchParams.set('trackCodeItem', newData.trackCodeItem || "");

        history.pushState({}, '', url);

        return newData;
    }


    $(document).ready(function () {
        checkURLData();
        correctItemShow();
        fetch(`{{ route('couriers.sort') }}`, {
            type: 'Get',
        }).then((response) => response.json())
            .then((response) => deployCouriersList(response));
    });

    $(document).ready(function () {
            $('#couriers_table th').on('click', function () {
            let sortField = $(this).data('sort');
            let sortOrder = $(this).data('order');

            let data = checkURLData({ orderCouriers: sortOrder, sortCouriers: sortField });

            $.ajax({
                url: '{{ route('couriers.sort') }}',
                type: 'GET',
                data: {
                    sort: data.sortCouriers,
                    order: data.orderCouriers,
                    pagination: data.paginationCouriers,
                    page: data.pageCouriers
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
                }
            });
        });
    });
    $(document).ready(function () {
        $('#search').on('keyup', function (e) {
            // Keyword
            var keyword = $('#search').val();
            let data = checkURLData({ trackCodeItem: keyword });

            $.ajax({
                url: '{{ route('courier.items.search') }}',
                type: 'GET',
                data: {
                    track_code: data.trackCodeItem,
                    courier_id: data.courierId,
                    sortItem: data.sortItems,
                    orderItem: data.orderItems,
                    paginationItems: data.paginationItems,
                    page_items: data.pageItems,
                },
                success: (response) => {
                    console.log('#search');

                    // Fill the table
                    deployItemsList(response);
                    correctItemShow();
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
            // Get params from URL
            let sortField = $(this).data('sort');
            let sortOrder = $(this).data('order');

            let data = checkURLData({ sortItems: sortField, orderItems: sortOrder });

            $.ajax({
                url: '{{ route('courier.items.search') }}',
                type: 'GET',
                data: {
                    track_code: data.trackCodeItem,
                    courier_id: data.courierId,
                    sortItem: data.sortItems,
                    orderItem: data.orderItems,
                    paginationItems: data.paginationItems,
                    page_items: data.pageItems,
                },
                success: (response) => {
                    console.log('#items_table th');

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
                    correctItemPaginationLinks();

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

    // Setting sort for items
    $(document).ready(function () {
        $('#pagination_couriers a').on('click', function (e) {
            let pagination = $(this).data("value");

            let data = checkURLData({ paginationCouriers: pagination });

            $.ajax({
                url: '{{ route('couriers.sort') }}',
                type: 'GET',
                data: {
                    sort: data.sortCouriers,
                    order: data.orderCouriers,
                    pagination: data.paginationCouriers,
                    page: data.pageCouriers
                },
                success: (response) => {
                    console.dir("pagination_couriers a");
                    deployCouriersList(response);
                    $("#pagination_couriers button").html(pagination);
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
                </tbody>
            </table>


            <div class="d-flex justify-content-between  p-2">
                <div class="d-flex justify-content-between" id="pagination_couriers">
                    <div>
                        {{ __('Show') }}
                        <div class="btn-group dropup">
                            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{$pagination}}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" data-value="1">1</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="2">2</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="5">5</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="10">10</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="25">25</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="50">50</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="100">>100</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="150">>150</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="200">>200</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="250">>250</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row-reverse" aria-label="{{ __('Page navigation example') }}" id="pagination">
                </div>
            </div>
        </div>
    </div>

    <div class="card bg-lightp-0 p-0 mt-3 col">
        <div class="card-body p-0 col d-flex flex-column justify-content-between">
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
            <div class="d-flex justify-content-between p-2">
                <div class="d-flex justify-content-between" id="links_items">
                    <div>
                        {{ __('Show') }}
                        <div class="btn-group dropup">
                            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false" id="links_items_show">
                                {{$pagination}}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" data-value="1">1</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="2">2</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="5">5</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="10">10</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="25">25</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="50">50</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="100">>100</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="150">>150</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="200">>200</a>
                                </li>
                                <li><a class="dropdown-item" href="#" data-value="250">>250</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row-reverse p-2" aria-label="{{ __('Page navigation example') }}"
                    id="items_pagination"></div>
            </div>

        </div>
    </div>

</div>


@endsection