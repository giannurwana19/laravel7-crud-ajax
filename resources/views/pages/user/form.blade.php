{{ Form::model($model, [
    'route' => $model->exists ? ['user.update', $model->id] : 'user.store',
    'method' => $model->exists ? 'PUT' : 'POST'
]) }}

<div class="form-group">
    {!! Form::label('name', 'name', ['class' => 'control-label']) !!}
    {!! Form::text('name', null, ['class' => 'form-control', 'id' => 'name']) !!}
</div>

<div class="form-group">
    {!! Form::label('email', 'email', ['class' => 'control-label']) !!}
    {!! Form::text('email', null, ['class' => 'form-control', 'id' => 'email']) !!}
</div>

{!! Form::close() !!}




{{--


    $model->exists
    menghasilkan true atau false
    mengecek apakah ada data di dalam $model



    --}}
