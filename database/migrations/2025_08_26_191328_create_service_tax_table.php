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
        Schema::create('service_tax', function (Blueprint $table) {
            $table->foreignUuid('service_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('tax_id')->constrained()->onDelete('cascade');
            $table->primary(['service_id', 'tax_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_tax');
    }
};
