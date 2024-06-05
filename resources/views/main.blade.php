<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Interface</title>
    <style>
        body {
            height: 100vh;
        }

        .C-dropdown-list {
            max-height: 10rem;
            overflow: auto;
        }

        .C-sidebar {
            display: flex;
            flex-direction: column;
            min-width: 15rem;
            margin-left: 0;
            transition: all 1s;
        }

        .C-focuser {
            position: absolute;
            top: -100%;
            height: 0;
            width: 0;
            border: 0;
        }
    </style>
    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('th').on('click', function() {
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
                        $.each(response.data, function(index, courier) {
                            rows += '<tr>';
                            rows += '<td>' + courier.name + '</td>';
                            rows += '<td>' + courier.delivered + '</td>';
                            rows += '<td>' + courier.in_progress + '</td>';
                            rows += '<td>' + courier.failed + '</td>';
                            rows += '</tr>';
                        });
                        $('tbody').html(rows);
                        
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

        let sidebarOpen = true;
    </script>
</head>
<body class="d-flex flex-column">
    <header class="navbar bg-body-tertiary">
        <div>
            <a class="navbar-brand" href="#"><img style="max-width: 10rem" src="https://pda.139express.com/img/logo.png" alt="139express"></a>
            <label for="C-focuser" class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" onclick="document.getElementById('sidebar').style.marginLeft = sidebarOpen ? '-15rem' : '0'; sidebarOpen = !sidebarOpen;">
                <span class="navbar-toggler-icon"></span>
            </label>
        </div>
    </header>
    <div class="d-flex flex-grow-1">
        <nav class="C-sidebar bg-body-tertiary" id="sidebar">
            <input class="C-focuser" id="C-focuser" autofocus/>
            <ul class="list-unstyled">
                <li class=""><button class="btn w-100 rounded-0" type="button">Home</button></li>
                <li class=""><button class="btn w-100 rounded-0" type="button">Statuses</button></li>
                <li class="">
                    <div class="dropdown">
                        <button class="btn w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </li>
                <li class=""><button class="btn w-100 rounded-0" type="button">External</button></li>
            </ul>
        </nav>
        <main>
            <div class="container-fluid">
                <div class="row justify-content-evenly px-4">
                    <nav class="p-0" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Library</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Data</li>
                        </ol>
                    </nav>
                    <div class=" row justify-space-between p-0 mt-3">
                        <div class="col p-0">
                            <button type="button" class="btn btn-success">Success</button>
                            <button type="button" class="btn btn-primary">Activity</button>
                            <button type="button" class="btn btn-secondary">Import</button>
                            <button type="button" class="btn btn-primary">Send SMS</button>
                        </div>
                        <div class="col-3"><input type="text" class="form-control " placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"></div>
                    </div>
                    <div class="p-0 d-flex">
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Track Code
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="Search" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">Action</button></li>
                                    <li><button class="dropdown-item" type="button">Another action</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Picked UP
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="Search" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">Action</button></li>
                                    <li><button class="dropdown-item" type="button">Another action</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropped Off
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="Search" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">Action</button></li>
                                    <li><button class="dropdown-item" type="button">Another action</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Time Difference
                            </button>
                            <div class="dropdown-menu pt-0">
                                <form class="p-1 ">
                                    <input type="search" class="form-control" id="searchCoin" placeholder="Search" autofocus="autofocus">
                                </form>
                                <ul class="list-unstyled m-0 C-dropdown-list">
                                    <li><button class="dropdown-item" type="button">Action</button></li>
                                    <li><button class="dropdown-item" type="button">Another action</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                    <li><button class="dropdown-item" type="button">Something else here</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card bg-lightp-0 p-0">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <div>
                                <h4><b>Couriers</b></h4>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="custom d-none">
                                            <input type="checkbox" id="checkall" onclick="setAllCheckboxes(this);">
                                        </th>
                                        <th data-sort="name" data-order="asc">Account</th>
                                        <th data-sort="delivered" data-order="asc">Delivered</th>
                                        <th data-sort="in_progress" data-order="asc">In progress</th>
                                        <th data-sort="failed" data-order="asc">Failed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    
                                    @foreach ($couriers as $courier)
                                        <tr class="item">
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
                            Show
                            <div class="btn-group dropup">
                                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{$pagination}}
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 1]) }}">1</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 2]) }}">2</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 5]) }}">5</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 10]) }}">10</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 25]) }}">25</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 50]) }}">50</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 100]) }}">100</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 150]) }}">150</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 200]) }}">200</a></li>
                                    <li><a class="dropdown-item" href="{{ route('couriers.index', ['sort' => $sortField, 'order' => $sortOrder, 'pagination' => 250]) }}">250</a></li>
                                </ul>
                            </div>
                        </div>
                        <nav aria-label="Page navigation example" id="pagination">
                            {{$couriers->appends(compact("couriers", 'sortField', 'sortOrder', 'pagination'))->links()}}
                        </nav>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
