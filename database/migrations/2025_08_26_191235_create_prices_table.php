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
            $table->id();
            $table->foreignId('user_id')->constrained()->nullOnDelete();
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->enum('type', ['fixed', 'hourly', 'daily', 'per_person'])->default('fixed');
            $table->integer("duration")->nullable()->comment('Duration in hours for hourly, days for daily');
            $table->integer('buffer_time_before')->nullable()->comment('Buffer in minutes before booking');
            $table->integer('buffer_time_after')->nullable()->comment('Buffer in minutes after booking');
        });

        Schema::create('conditional_pricings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->nullOnDelete();
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->integer('duration')->comment('Duration in hours for hourly, days for daily');
            $table->enum('type', ['hourly', 'daily']);
            $table->decimal('amount', 10, 2);
            
            $table->unique(['service_id', 'duration']);
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
