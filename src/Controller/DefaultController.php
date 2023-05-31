<?php

namespace App\Controller;

use ApiPlatform\Metadata\ApiResource;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    private function jsonResponse($content, $encode = true)
    {
        $response = new Response();
        $data = $encode ? json_encode($content) : $content;
        $response->setContent($data);
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

    #[Route('/', name: 'home')]
    public function index(): Response
    {
        return $this->jsonResponse(["success" => true]);
    }
}
