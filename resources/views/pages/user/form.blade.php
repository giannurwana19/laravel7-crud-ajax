{{ Form::model($model, ['route' => 'user.store', 'method' => 'POST']) }}

<div class="form-group">
    {!! Form::label('name', 'name', ['class' => 'control-label']) !!}
    {!! Form::text('name', null, ['class' => 'form-control', 'id' => 'name']) !!}
</div>

<div class="form-group">
    {!! Form::label('email', 'email', ['class' => 'control-label']) !!}
    {!! Form::text('email', null, ['class' => 'form-control', 'id' => 'email']) !!}
</div>

{!! Form::close() !!}
