class Api::TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo
    else
      render new
    end
  end

  private
  def todo_params
    params.require(:todo).permit(:name, :status, :assignee, :mandays)
  end
end

