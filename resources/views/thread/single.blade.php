@extends('layouts.front')


@section('content')
    <div class="content-wrap well">
        <h4>{{$thread->subject}}</h4>
        <hr>

        <div class="thread-details">
            {!! \Michelf\Markdown::defaultTransform($thread->thread)  !!}
        </div>
        <br>

        {{--@if(auth()->user()->id == $thread->user_id)--}}
        @can('update',$thread)
            <div class="actions">

                <a href="{{route('thread.edit',$thread->id)}}" class="btn btn-info btn-xs">Edit</a>

                {{--//delete form--}}
                <form action="{{route('thread.destroy',$thread->id)}}" method="POST" class="inline-it">
                    {{csrf_field()}}
                    {{method_field('DELETE')}}
                    <input class="btn btn-xs btn-danger" type="submit" value="Delete">
                </form>

            </div>
        @endcan
        {{--@endif--}}
    </div>
    <hr>
    <br>

    {{--Answer/comment--}}
    <div id="contentNoti"></div>
   
    <br><br>
    @include('thread.partials.comment-form')

@endsection


@section('js')

    <script>
        function toggleReply(commentId){
            $('.reply-form-'+commentId).toggleClass('hidden');
        }

    </script>

@endsection