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
        Schema::create('taxes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name'); // VAT, Sales Tax, City Tax
            $table->string('description')->nullable();
            $table->decimal('rate', 5, 2); // 10.00 for 10%
            $table->string('type')->default('percentage'); // percentage or fixed
            $table->boolean('is_default')->default(false);
            $table->boolean('is_compound')->default(false); // tax on tax?
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxes');
    }
};
