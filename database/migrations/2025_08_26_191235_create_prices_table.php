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
        Schema::create('prices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->foreignId('pricing_model_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2); // base price
            $table->decimal('min_amount', 10, 2)->nullable(); // minimum charge
            $table->decimal('max_amount', 10, 2)->nullable(); // maximum charge
            $table->integer('min_quantity')->default(1); // minimum units
            $table->integer('max_quantity')->nullable(); // maximum units
            $table->date('valid_from')->nullable();
            $table->date('valid_until')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
            
            $table->unique(['service_id', 'pricing_model_id', 'valid_from'], 'price_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
