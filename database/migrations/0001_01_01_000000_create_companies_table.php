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
        Schema::create('companies', function (Blueprint $table) {
            $table->ulid('id')->primary();
            // info
            $table->string('name');
            $table->string('slogan')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->text('description')->nullable();
            // address
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->mediumInteger('zip')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
