@extends('layouts.front')

@section('banner')

@endsection
@section('heading',"Threads")
@section('content')
    
    @include('thread.partials.thread-list')
@endsection