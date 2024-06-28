<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Interface</title>
    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="{{ URL::asset('css/app.css') }}" rel="stylesheet" type="text/css"/>
</head>

<body class="d-flex flex-column">
    <header class="navbar bg-body-tertiary justify-content-between px-2">
        <div class="d-flex">
            <a class="navbar-brand" href="#"><img style="max-width: 10rem" src="{{URL::asset("img/logo.png")}}"
                    alt="139express"></a>
            <script>
                let sidebarOpen =true;
            </script>
            <label for="C-focuser" class="navbar-toggler d-flex align-items-center border-0" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                aria-label="{{ __('Toggle navigation') }}"
                onclick="document.getElementById('sidebar').style.marginLeft = sidebarOpen ? '-15rem' : '0'; sidebarOpen = !sidebarOpen;">
                <span class="navbar-toggler-icon"></span>
            </label>
        </div>
        <div class="dropdown C-language-wrapper">
            <a class="btn " href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{__("EN")}}
            </a>

            <div class="dropdown-menu C-language-menu">
                <header>
                    <h3 class="C-language-menu-title">{{__("Choose language")}}</h3>
                </header>
                <ul class="C-language-list">
                    <li><a class="C-language" href="locale/en"><img class="C-language-flag"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg"
                                alt="English" />English language</a>
                    </li>
                    <li><a class="C-language" href="locale/ru"><img class="C-language-flag"
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png"
                                alt="Русский" />Русский язык</a>
                    </li>
                </ul>
            </div>
        </div>
        
    </header>
    <div class="d-flex flex-grow-1">
        <nav class="C-sidebar bg-body-tertiary" id="sidebar">
            <input class="C-focuser" id="C-focuser" autofocus />
            <ul class="list-unstyled">
                <li class=""><button class="btn w-100 rounded-0 C-button" type="button">{{ __('Home') }}</button></li>
                <li class=""><button class="btn w-100 rounded-0 C-button" type="button">{{ __('Statuses') }}</button></li>
                <li class="">
                    <div class="dropdown">
                        <button class="btn w-100 dropdown-toggle C-button rounded-0" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{ __('Dropdown button') }}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item C-button" href="#">{{ __('Action') }}</a></li>
                            <li><a class="dropdown-item C-button" href="#">{{ __('Another action') }}</a></li>
                            <li><a class="dropdown-item C-button" href="#">{{ __('Something else here') }}</a></li>
                        </ul>
                    </div>
                </li>
                <li class=""><button class="btn w-100 rounded-0 C-button" type="button">{{ __('External') }}</button></li>
            </ul>
        </nav>
        <main class="flex-grow-1">
            <div class="container-fluid">
                <div class="row justify-content-evenly px-4 py-3">

                    <!-- Content -->
                    @yield('content');
                    
                </div>
            </div>
        </main>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>