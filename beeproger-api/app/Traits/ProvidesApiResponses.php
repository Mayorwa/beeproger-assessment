<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ProvidesApiResponses
{
    /**
     * Send a formatted 200 HTTP response.
     *
     * @param string $message
     * @param mixed $data
     *
     * @return JsonResponse
     */
    public function okResponse(string $message, $data = null): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ]);
    }

    /**
     * Send a formatted 201 HTTP response.
     *
     * @param string $message
     * @param mixed $data
     *
     * @return JsonResponse
     */
    public function createdResponse(string $message, $data = null): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], Response::HTTP_CREATED);
    }

    /**
     * Send a formatted 400 HTTP response.
     *
     * @param string $message
     *
     * @return JsonResponse
     */
    public function badRequestResponse(string $message): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Send a formatted 404 HTTP response.
     *
     * @param string|null $message
     *
     * @return JsonResponse
     */
    public function notFoundResponse(?string $message = null): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message ?? 'Resource not found.',
        ], Response::HTTP_NOT_FOUND);
    }

    /**
     * Send a formatted 500 HTTP response.
     *
     * @param string|null $message
     *
     * @return JsonResponse
     */
    public function serverErrorResponse(?string $message = null): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message ?? 'Internal server error',
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
