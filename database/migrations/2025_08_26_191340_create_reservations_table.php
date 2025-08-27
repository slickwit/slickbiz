<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('reservation_number')->unique();
            
            // Relationships
            $table->foreignUuid('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('service_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('assigned_employee_id')->nullable()->constrained('users')->onDelete('set null');
            
            // Timing
            $table->timestamp('start_datetime');
            $table->timestamp('end_datetime');
            $table->string('timezone')->default('UTC');
            
            // Quantities
            $table->integer('guests_count')->default(1);
            $table->integer('units_reserved')->default(1);
            
            // Status
            $table->enum('status', ['draft', 'pending', 'confirmed', 'checked_in', 'completed', 'cancelled', 'no_show'])->default('draft');
            $table->text('cancellation_reason')->nullable();
            $table->string('source')->default('website'); // website, phone, in_person, partner
            
            // Special requests
            $table->text('special_requests')->nullable(); // dietary restrictions, accessibility needs, etc.
            $table->text('internal_notes')->nullable(); // text field for staff only
            
            // Financials (calculated at booking time)
            $table->decimal('base_price', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('total_price', 10, 2)->default(0);
            $table->json('price_breakdown')->nullable();
            
            // Timestamps
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for performance
            $table->index('reservation_number');
            $table->index('status');
            $table->index('start_datetime');
            $table->index('end_datetime');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
