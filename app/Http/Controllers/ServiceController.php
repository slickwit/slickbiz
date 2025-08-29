<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller {

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $query = Service::with([
            'category',
            'price',
            'conditionalPricings',
            'taxes',
            'extrasGroups'
        ])
            ->withCount([
                'reservations as reservations_count', // Total reservations count
                'reservations as upcoming_reservations_count' => function ($query) {
                    $query->where('start_datetime', '>', now())
                        ->whereIn('status', ['confirmed', 'pending']);
                },
                'reservations as completed_reservations_count' => function ($query) {
                    $query->where('status', 'completed');
                },
                'reservations as cancelled_reservations_count' => function ($query) {
                    $query->where('status', 'cancelled');
                }
            ]);

        // Search filter
        if ($request->has('search')) {
            $query->where('name', 'ilike', '%' . $request->search . '%')
                ->orWhere('description', 'ilike', '%' . $request->search . '%');
        }

        // Status filter
        if ($request->has('is_active') && $request->is_active !== '') {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if($request->has("categories")) {
            $query->whereIn('category_id', explode(",", $request->categories));
        }

        // Pagination with sorting
        $services = $query->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 15);

        return Inertia::render('dashboard/services/list/page', [
            'services' => $services,
            'filters' => $request->only(['search', 'is_active', 'categories', 'per_page']),
            'categories' => Category::where('is_active', true)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service) {
        //
    }
}
