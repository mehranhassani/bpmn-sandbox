<?php
require_once __DIR__ . '/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

$app = new Silex\Application();

$app->get('/v2016/06/hello/{user}', function(Application $app, Request $request, $user) {            
            return new Response('Hi '.$user.'! Im PHP Docker!');
            });
$app->run();
?>