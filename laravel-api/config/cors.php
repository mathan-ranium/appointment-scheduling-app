<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines which domains are allowed to access your
    | application's resources via JavaScript a cross-domain request.
    |
    | You may enable CORS for specific paths and domains.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Keep this as is
    'allowed_methods' => ['*'], // Keep this as is

    'allowed_origins' => [
        'http://localhost:3000', // You had this, keep it.
        'http://127.0.0.1:3000', // You had this, keep it.
        'http://localhost:3001', // <--- ADD THIS LINE! This is your current React origin
        'http://127.0.0.1:3001', // <--- Consider adding this too for completeness
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Keep this as true

];